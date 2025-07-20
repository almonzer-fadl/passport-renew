import React, { useRef, useState, useEffect } from 'react';

export function Signature() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isClear, setIsClear] = useState(true);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    prepareCanvas();
  }, []);

  const prepareCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    console.log(canvas);
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth/2}px`;
    canvas.style.height = `${window.innerHeight/2}px`;
    
    const context = canvas.getContext("2d");
    context.scale(4, 4);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 3;
    contextRef.current = context;
    console.log("canvas prepared");
    setIsClear(true);
  };

  const startDrawing = ({ nativeEvent }) => {
    if (!contextRef.current) {
      console.log("Context not ready, preparing canvas...");
      prepareCanvas();
      if (!contextRef.current) return; // Still not ready, abort
    }
    
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    console.log("drawing started");
  };

  const finishDrawing = () => {
    if (!contextRef.current) {
      return; // Still not ready, abort
    }
    contextRef.current.closePath();
    setIsDrawing(false);
    setIsClear(false);
    console.log("drawing finished");
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing || !contextRef.current) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    console.log(offsetX, offsetY);
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    // Use clearRect for transparent background instead of fillRect
    context.clearRect(0, 0, canvas.width, canvas.height);
    setIsClear(true);
  };

  const handleConfirm = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png');
    setPhoto(dataURL);
    console.log('Photo captured:', dataURL);
  };

  const handleRetry = () => {
    // Reset all states first
    setPhoto(null);
    setIsDrawing(false);
    setIsClear(true);
    
    // Then clear and prepare canvas
    setTimeout(() => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Re-prepare the canvas context
        prepareCanvas();
      }
    }, 0);
  };

  return (
    <div className="w-full min-h-screen/2 flex flex-col">
      {!photo && (
        <>
          <canvas
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            className="bg-white rounded-2xl border-2 m-auto my-10 border-dashed cursor-crosshair"
            ref={canvasRef}
            id="sign-canvas"
            style={{ width: '400px', height: '300px' }}
          />
          <div className="flex justify-center items-center w-full space-x-10">
            {!isClear && (
              <button
                className="btn  text-white font-bold py-2 px-4 rounded"
                onClick={clearCanvas}
              >
                Clear
              </button>
            )}
            {!isClear && (
              <button
                className="btn btn-primary text-white font-bold py-2 px-4 rounded"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            )}
          </div>
        </>
      )}
      {photo && (
        <div className="flex flex-col justify-center items-center space-y-4 p-4">
          <img
            className="max-w-md max-h-80 border-2 border-gray-300 rounded"
            src={photo}
            alt="Signature"
          />
          <button
            className="btn-error btn text-white font-bold py-2 px-4 rounded"
            onClick={handleRetry}
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
}