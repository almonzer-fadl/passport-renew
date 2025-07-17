import React, { useRef, useState, useEffect } from 'react';
import './Organizer.css'
import * as faceapi from 'face-api.js'


export default function PersonalPhoto() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const faceCanvasRef = useRef(null)
  const [photo, setPhoto] = useState(null);
  const [stream, setStream] = useState(null);
  const intervalRef = useRef(null);
  const [isFace,setIsFace] = useState(false)
  const [hasWhiteBackground, setHasWhiteBackground] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
            faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
            faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
            faceapi.nets.faceExpressionNet.loadFromUri("/models")
        ]);
    };
    loadModels();
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
        if (videoRef.current && faceCanvasRef.current && !videoRef.current.paused && !videoRef.current.ended) {
            faceapi.matchDimensions(faceCanvasRef.current, {
                width: videoRef.current.videoWidth,
                height: videoRef.current.videoHeight
            });

            const detections = await faceapi.detectAllFaces(videoRef.current,
                new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
            
            const resizedDetections = faceapi.resizeResults(detections, {
                width: videoRef.current.videoWidth,
                height: videoRef.current.videoHeight
            });

            
            const context = faceCanvasRef.current.getContext('2d');
            context.clearRect(0, 0, faceCanvasRef.current.width, faceCanvasRef.current.height);
            faceapi.draw.drawDetections(faceCanvasRef.current, resizedDetections);

            if (detections && detections.length > 0) {
                const face = detections[0];
                const box = face.detection.box;

                const tempCanvas = document.createElement('canvas');
                const tempCtx = tempCanvas.getContext('2d');
                tempCanvas.width = videoRef.current.videoWidth;
                tempCanvas.height = videoRef.current.videoHeight;
                tempCtx.drawImage(videoRef.current, 0, 0, tempCanvas.width, tempCanvas.height);

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

  const startCamera = async () => {
    try {
      setPhoto(null);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
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
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    
    const imageData = canvas.toDataURL('image/png');
    setPhoto(imageData);
    stopCamera();
  };

  const retakePhoto = ()=> {
    startCamera()
  }

  return (
    <div >
      
      <div >
        {!stream && !photo ? (
          <button 
            onClick={startCamera}
            className="button"
          >
            Start Camera
          </button>
        ) : null}

      </div>

      <div className={stream ? "absolute video-container" : ''}>

         {stream && (
          <div className='button-container'>
            <button 
              onClick={stopCamera}
              className="button"
            >
              Cancel
            </button>
            <button 
              disabled={!isFace || !hasWhiteBackground}
              onClick={takePhoto}
              className={`button ${(isFace && hasWhiteBackground) ? "" : "disabled"}`}
            >
              Take Photo
            </button>
          </div>
        )}

        {photo && (
          <div>
            <button 
                onClick={() => {
                    setPhoto(null)
                }}
                className="button"
            >
                Cancel
            </button>
            <button 
                onClick={retakePhoto}
                className="button"
            >
                Retake
            </button>
          </div>
        )}
      
        <div className='canvas-container'>
          <video 
            ref={videoRef} 
            autoPlay 
            muted
            onPlay={handleVideoPlay}
            className={`video ${stream && !photo ? '' : 'hidden'}`}
          />
          <canvas ref={faceCanvasRef}
              className='face-canvas'
          />
        </div>

        <canvas ref={canvasRef} className={photo ? '' : 'hidden'} />
      </div>
    </div>
  );
}