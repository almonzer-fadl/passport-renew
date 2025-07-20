import React, { useRef, useState, useEffect } from 'react';
import * as faceapi from 'face-api.js'

export default function PersonalPhoto() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const faceCanvasRef = useRef(null)
  const [photo, setPhoto] = useState(null);
  const [photoBlob, setPhotoBlob] = useState(null); // Store as blob for saving
  const [stream, setStream] = useState(null);
  const intervalRef = useRef(null);
  const [isFace,setIsFace] = useState(false)
  const [hasWhiteBackground, setHasWhiteBackground] = useState(false);
  const [cameraDimensions, setCameraDimensions] = useState({ width: 0, height: 0 });



  useEffect(() => {
    const loadModels = async () => {
        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
            faceapi.nets.faceRecognitionNet.loadFromUri("/models")
        ]);
    };
    loadModels();
  }, []);

  useEffect(() => {
    const calculateDimensions = () => {
      const aspectRatio = 3/4;
      const availableWidth = window.innerWidth;
      const availableHeight = window.innerHeight;
      const windowAspectRatio = availableWidth / availableHeight;

      let cameraWidth;
      let cameraHeight;

      if (windowAspectRatio > aspectRatio) {
        // Window is wider than the video, so fit to height.
        cameraHeight = availableHeight;
        cameraWidth = availableHeight * aspectRatio;
      } else {
        // Window is taller or has the same aspect ratio, so fit to width.
        cameraWidth = availableWidth;
        cameraHeight = availableWidth / aspectRatio;
      }
      // Using 90% of the calculated size to leave some margin.
      setCameraDimensions({ width: cameraWidth * 0.9, height: cameraHeight * 0.9 });
    };

    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);

    return () => {
      window.removeEventListener('resize', calculateDimensions);
    };
  }, []);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [stream]);

  const handleVideoPlay = () => {
    if (intervalRef.current) {
        clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(async () => {
        if (videoRef.current && faceCanvasRef.current && !videoRef.current.paused && !videoRef.current.ended && cameraDimensions.width > 0) {
            faceapi.matchDimensions(faceCanvasRef.current, {
                width: cameraDimensions.width,
                height: cameraDimensions.height
            });

            const detections = await faceapi.detectAllFaces(videoRef.current,
                new faceapi.TinyFaceDetectorOptions());
            
            const resizedDetections = faceapi.resizeResults(detections, {
                width: cameraDimensions.width,
                height: cameraDimensions.height
            });

            
            // const context = faceCanvasRef.current.getContext('2d');
            // context.clearRect(0, 0, faceCanvasRef.current.width, faceCanvasRef.current.height);
            // faceapi.draw.drawDetections(faceCanvasRef.current, resizedDetections);

            if (detections && detections.length > 0) {
                const face = detections[0];
                const box = face.detection.box;

                const tempCanvas = document.createElement('canvas');
                const tempCtx = tempCanvas.getContext('2d');
                tempCanvas.width = cameraDimensions.width;
                tempCanvas.height = cameraDimensions.height;
                
                // Draw the video frame cropped to the aspect ratio
                drawVideoToCanvas(tempCtx, videoRef.current, cameraDimensions.width, cameraDimensions.height);

                const samplePoints = [
                    { x: 0, y: 0 },
                    { x: tempCanvas.width - 1, y: 0 },
                    { x: 0, y: tempCanvas.height - 1 },
                    { x: tempCanvas.width - 1, y: tempCanvas.height - 1 }
                ];

                let whitePixelCount = 0;
                const whiteThreshold = 0;

                samplePoints.forEach(point => {
                    if (point.x < box.x || point.x > box.x + box.width || point.y < box.y || point.y > box.y + box.height) {
                        const pixelData = tempCtx.getImageData(point.x, point.y, 1, 1).data;
                        if (pixelData[0] > whiteThreshold && pixelData[1] > whiteThreshold && pixelData[2] > whiteThreshold) {
                            whitePixelCount++;
                        }
                    }
                });

                setHasWhiteBackground(whitePixelCount >= 3);

                const faceScore = face.detection.score;
                setIsFace(faceScore >= 0.6);
            } else {
                setIsFace(false);
                setHasWhiteBackground(false);
            }
        }
    }, 100);
  }

  // Helper function to draw video to canvas with proper cropping for aspect ratio
  const drawVideoToCanvas = (ctx, video, targetWidth, targetHeight) => {
    const videoAspectRatio = video.videoWidth / video.videoHeight;
    const targetAspectRatio = targetWidth / targetHeight;
    
    let sx = 0, sy = 0, sWidth = video.videoWidth, sHeight = video.videoHeight;
    
    if (videoAspectRatio > targetAspectRatio) {
      // Video is wider than target, crop horizontally
      sWidth = video.videoHeight * targetAspectRatio;
      sx = (video.videoWidth - sWidth) / 2;
    } else {
      // Video is taller than target, crop vertically
      sHeight = video.videoWidth / targetAspectRatio;
      sy = (video.videoHeight - sHeight) / 2;
    }
    
    ctx.drawImage(video, sx, sy, sWidth, sHeight, 0, 0, targetWidth, targetHeight);
  };

  const startCamera = async () => {
    try {
      setPhoto(null);
      setPhotoBlob(null);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      // Request camera with preferred resolution
      const cameraStream = await navigator.mediaDevices.getUserMedia({ 
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        }
      });
      setStream(cameraStream);
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const stopCamera = () => {
    setStream(null);
  };

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) {
      return;
    }
    const context = canvas.getContext('2d');
    
    // Set canvas to desired aspect ratio
    canvas.width = cameraDimensions.width;
    canvas.height = cameraDimensions.height;
    
    // Draw video to canvas with proper cropping
    drawVideoToCanvas(context, video, cameraDimensions.width, cameraDimensions.height);
    
    // Get image data as PNG
    const imageDataURL = canvas.toDataURL('image/png');
    console.log(imageDataURL)
    setPhoto(imageDataURL);
    
    // Convert to blob for saving
    canvas.toBlob((blob) => {
      setPhotoBlob(blob);
    }, 'image/png');
    
    stopCamera();
  };

  const retakePhoto = ()=> {
    startCamera()
  }

  // Function to save the image
  const savePhoto = () => {
    if (photoBlob) {
      const url = URL.createObjectURL(photoBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `photo_${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className=''>
      
      <div className={!photo?' min-h-50 flex justify-center align-middle border-2 m-4 border-dashed rounded-2xl':""}>
        {!stream && !photo ? (
          <button
          className="btn-primary btn m-auto" 
            onClick={startCamera}
            text="StartCamera"

          >
            Start Camera
          </button>
        ) : null}

      </div>

      <div className={stream ? "bg-white absolute top-0 left-0  w-full h-dvh flex align-middle justify-center z-10" : 'none'}>

         {stream && (
          <div className='absolute bottom-10 gap-10 flex justify-center'>
            <button 
            className='btn'
              onClick={stopCamera}
            >
              Cancel
            </button>
            <button 
            className='btn btn-primary'
              onClick={takePhoto}
              // disabled={!isFace}
            >
              Take Photo
            </button>
          </div>
        )}

        {photo && (
          <div className='flex space-x-10 justify-center p-10'>
            <button 
                onClick={() => {
                    setPhoto(null)
                    setPhotoBlob(null)
                }}
                className="btn"
            >
              Remove
            </button>
            <button 
                onClick={retakePhoto}
                className="btn"
                text="Retake"
            >
                Retake
            </button>
            <button 
                onClick={savePhoto}
                className="btn"
            >
              Save
            </button>
          </div>
        )}
      
        <div className='w-full h-full'>
          <video 
            ref={videoRef} 
            autoPlay 
            muted
            onPlay={handleVideoPlay}
            className={`${stream && !photo ? 'm-auto' : 'hidden'}`}
            style={{
              width:cameraDimensions.width,
              height:cameraDimensions.height,
              objectFit: 'cover'
            }}
          />
      
        </div>

        <canvas 
          ref={canvasRef} 
          className={photo ? 'mx-auto my-10 p-4 border-4 border-gray-400 border-dashed' : 'hidden'}
          style={{
            width: `${cameraDimensions.width/2}px`,
            height: `${cameraDimensions.height/2}px`
          }}
        />
      </div>
    </div>
  );
}
