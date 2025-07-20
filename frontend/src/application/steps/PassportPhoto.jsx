import React, { useRef, useState, useEffect } from 'react';

export function PassportPhoto() {
    const [photo, setPhoto] = useState(null)
    const [photoBlob, setPhotoBlob] = useState(null)
    const [stream, setStream] = useState(null)
    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    const intervalRef = useRef(null)
    const [cameraDimensions, setCameraDimensions] = useState({width: 0, height: 0})



    useEffect(() => {
        const calculateDimensions = () => {
          const aspectRatio = 4/3;
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
    
    // CRITICAL: Effect to connect stream to video element
    useEffect(() => {
        if (stream && videoRef.current) {
            videoRef.current.srcObject = stream;
        } else if (!stream && videoRef.current) {
            videoRef.current.srcObject = null;
        }
    }, [stream]);

    const startCamera = async () => {
        try {
            setPhoto(null);
            // Request camera with preferred resolution
            const cameraStream = await navigator.mediaDevices.getUserMedia({ 
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: { ideal: 'environment' }
                }
            });
            setStream(cameraStream);
        } catch (err) {
            console.error('Error accessing camera:', err);
        }
    }  
    
    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        setStream(null);
    }
    
    const cancel = () => {
        // Properly stop camera and reset states
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        setPhoto(null);
        setStream(null);
        setPhotoBlob(null);
    }
    const handlePlay = ()=>{
         if (intervalRef.current) {
         clearInterval(intervalRef.current);
    }
        intervalRef.current = setInterval(()=>{
           canvasRef.current = document.createElement('canvas')
           const tempCtx = canvasRef.current.getContext('2d');
           canvasRef.current.width = cameraDimensions.width;
           canvasRef.current.height = cameraDimensions.height;
           drawVideoToCanvas(tempCtx, videoRef.current, cameraDimensions.width, cameraDimensions.height);
            

        },100)

    }
    
    const takePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) {
            //TODO: Find why this canvas is never having a value
            console.log("no canvas");
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
    }

    const drawVideoToCanvas = (ctx, video, targetWidth, targetHeight) => {
        if(!video){
            return
        }
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
   
    return (
        <>
            {!stream && !photo && (
                <div className="min-h-50 flex justify-center align-middle rounded-2xl border-2 m-4 border-dashed">
                    <button
                        className="btn-primary btn m-auto" 
                        onClick={startCamera}
                    >
                        Start Camera
                    </button>
                </div>
            )}
            
            {stream && !photo && (
                <div className='bg-white absolute top-0 left-0  w-full h-dvh flex align-middle justify-center z-10'>
                    <video 
                        className='my-auto'
                        autoPlay
                        onPlay={handlePlay}
                        muted
                        ref={videoRef}
                        style={{
                            width: cameraDimensions.width,
                            height: cameraDimensions.height,
                            objectFit: "cover"
                        }}
                    />

                    <div className='absolute top-1/2 left-1/2 -translate-1/2 border-white border-4 border-dashed rounded-2xl'
                      style={{
                            width: cameraDimensions.width * 0.9,
                            height: cameraDimensions.height *0.9,
                            objectFit: "cover"
                        }}
                    ></div>

                    <div className='flex justify-center gap-10 pt-5 absolute bottom-1/10'>
                        <button onClick={stopCamera} className='btn'>Cancel</button>
                        <button onClick={takePhoto} className='btn btn-primary'>Take</button>
                    </div>
                </div>
            )}
            
            {photo && (
                <div className='flex flex-col items-center m-10'>
                    {/* <canvas
                        ref={canvasRef}
                        className='none'
                       
                    /> */}
                    <img 
                    className='p-4 border-4 border-gray-400 border-dashed'
                      style={{
                            width: cameraDimensions.width/2,
                            height: cameraDimensions.height/2,
                            objectFit: "cover"
                        }}
                    src={photo}></img>
                    
                    <div className='flex justify-center gap-10 pt-5'>
                        <button onClick={cancel} className='btn'>Remove</button>
                        <button onClick={startCamera} className='btn'>Retake</button>
                    </div>
                </div>
            )}
        </>
    )
}