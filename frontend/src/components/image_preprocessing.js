class ImagePreprocessor {
  static preprocessImage(imageElement, options = {}) {
    const {
      scale = 2,           // Upscale for better OCR
      contrast = 1.2,      // Increase contrast
      brightness = 1.1,    // Slight brightness boost
      grayscale = true     // Convert to grayscale
    } = options;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = imageElement.width * scale;
    canvas.height = imageElement.height * scale;
    
    // Apply image smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    // Draw and scale image
    ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);
    
    // Apply filters
    if (grayscale || contrast !== 1 || brightness !== 1) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];
        
        // Apply brightness and contrast
        r = Math.min(255, Math.max(0, (r - 128) * contrast + 128 + (brightness - 1) * 128));
        g = Math.min(255, Math.max(0, (g - 128) * contrast + 128 + (brightness - 1) * 128));
        b = Math.min(255, Math.max(0, (b - 128) * contrast + 128 + (brightness - 1) * 128));
        
        // Convert to grayscale if requested
        if (grayscale) {
          const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
          r = g = b = gray;
        }
        
        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
      }
      
      ctx.putImageData(imageData, 0, 0);
    }
    
    return canvas;
  }

  static async extractTextWithPreprocessing(imageFile) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = async () => {
        // Preprocess the image
        const processedCanvas = ImagePreprocessor.preprocessImage(img);
        
        // Convert canvas to blob for OCR
        processedCanvas.toBlob(async (blob) => {
          const text = await extractTextFromImage(blob);
          resolve(text);
        });
      };
      img.src = URL.createObjectURL(imageFile);
    });
  }
}

// iOS Camera Compatibility Utilities
export const isIOS = () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

export const isSafari = () => {
    return /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
};

export const isIOSSafari = () => {
    return isIOS() && isSafari();
};

export const isChromeIOS = () => {
    return /CriOS/.test(navigator.userAgent);
};

export const isFirefoxIOS = () => {
    return /FxiOS/.test(navigator.userAgent);
};

export const getIOSCompatibleConstraints = (facingMode = 'environment', aspectRatio = 4/3) => {
    const isIOSDevice = isIOSSafari();
    
    let constraints = {
        video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: { ideal: facingMode }
        }
    };
    
    if (isIOSDevice) {
        constraints = {
            video: {
                width: { min: 640, ideal: 1280, max: 1920 },
                height: { min: 480, ideal: 720, max: 1080 },
                facingMode: { ideal: facingMode },
                frameRate: { ideal: 30 },
                aspectRatio: { ideal: aspectRatio }
            }
        };
    }
    
    return constraints;
};

export const setupIOSVideoElement = (videoElement) => {
    if (videoElement && isIOS()) {
        videoElement.setAttribute('playsinline', 'true');
        videoElement.setAttribute('webkit-playsinline', 'true');
        videoElement.setAttribute('x-webkit-airplay', 'allow');
        videoElement.setAttribute('autoplay', 'true');
        videoElement.setAttribute('muted', 'true');
    }
};

export const getCameraErrorMessage = (error) => {
    if (error.name === 'NotAllowedError') {
        return 'Camera access denied. Please allow camera permissions and try again.';
    } else if (error.name === 'NotFoundError') {
        return 'No camera found on this device.';
    } else if (error.name === 'NotSupportedError') {
        return 'Camera not supported in this browser. Please use Safari on iOS.';
    } else if (error.name === 'SecurityError') {
        return 'Camera access blocked due to security restrictions. Please use HTTPS.';
    } else if (error.name === 'AbortError') {
        return 'Camera access was aborted. Please try again.';
    } else if (error.name === 'NotReadableError') {
        return 'Camera is already in use by another application.';
    } else {
        return 'Failed to access camera. Please check permissions and try again.';
    }
};

export const checkCameraSupport = () => {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
};

export const checkHTTPS = () => {
    return window.location.protocol === 'https:' || window.location.hostname === 'localhost';
};

export const getCameraAccessTips = () => {
    const tips = [];
    
    if (isIOS()) {
        tips.push('Use Safari browser for best compatibility');
        tips.push('Make sure you\'re on HTTPS or localhost');
        tips.push('Allow camera permissions when prompted');
        tips.push('Ensure no other app is using the camera');
    }
    
    if (!checkHTTPS()) {
        tips.push('Camera access requires HTTPS connection');
    }
    
    return tips;
};

export const requestCameraWithFallback = async (constraints, maxRetries = 3) => {
    let lastError;
    
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await navigator.mediaDevices.getUserMedia(constraints);
        } catch (error) {
            lastError = error;
            console.warn(`Camera access attempt ${i + 1} failed:`, error);
            
            // If it's a permission error, don't retry
            if (error.name === 'NotAllowedError') {
                break;
            }
            
            // Wait a bit before retrying
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    
    throw lastError;
};

export const debugCameraInfo = () => {
    const info = {
        userAgent: navigator.userAgent,
        isIOS: isIOS(),
        isSafari: isSafari(),
        isIOSSafari: isIOSSafari(),
        isChromeIOS: isChromeIOS(),
        isFirefoxIOS: isFirefoxIOS(),
        hasGetUserMedia: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
        isHTTPS: checkHTTPS(),
        protocol: window.location.protocol,
        hostname: window.location.hostname,
        url: window.location.href
    };
    
    console.log('Camera Debug Info:', info);
    return info;
};

export const testCameraAccess = async () => {
    try {
        const constraints = {
            video: {
                width: { ideal: 640 },
                height: { ideal: 480 }
            }
        };
        
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const tracks = stream.getTracks();
        const videoTrack = tracks.find(track => track.kind === 'video');
        
        if (videoTrack) {
            const settings = videoTrack.getSettings();
            console.log('Camera Test Success:', {
                width: settings.width,
                height: settings.height,
                frameRate: settings.frameRate,
                facingMode: settings.facingMode
            });
        }
        
        // Stop the test stream
        tracks.forEach(track => track.stop());
        return true;
    } catch (error) {
        console.error('Camera Test Failed:', error);
        return false;
    }
};

// Usage with file input
document.getElementById('imageInput').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (file) {
    const text = await ImagePreprocessor.extractTextWithPreprocessing(file);
    console.log('Extracted text:', text);
  }
});