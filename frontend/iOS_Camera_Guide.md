# iOS Camera Compatibility Guide

## Overview
This guide provides information about iOS camera compatibility and troubleshooting for the passport renewal application.

## iOS Camera Requirements

### 1. HTTPS Requirement
- iOS Safari requires HTTPS for camera access
- Localhost is allowed for development
- Production must use HTTPS

### 2. Browser Compatibility
- **Safari**: Best compatibility, recommended
- **Chrome iOS**: Limited camera support
- **Firefox iOS**: Limited camera support

### 3. User Interaction
- Camera access must be triggered by user interaction
- Cannot be called automatically on page load

## Implementation Details

### Camera Constraints for iOS
```javascript
const constraints = {
    video: {
        width: { min: 640, ideal: 1280, max: 1920 },
        height: { min: 480, ideal: 720, max: 1080 },
        facingMode: { ideal: 'environment' }, // or 'user'
        frameRate: { ideal: 30 },
        aspectRatio: { ideal: 4/3 } // or 3/4 for personal photos
    }
};
```

### Video Element Attributes
```html
<video 
    playsInline
    webkit-playsinline="true"
    x-webkit-airplay="allow"
    autoplay
    muted
    ref={videoRef}
/>
```

## Common Issues and Solutions

### 1. Camera Not Working
**Symptoms**: Camera doesn't start or shows black screen
**Solutions**:
- Ensure HTTPS is enabled
- Use Safari browser
- Check camera permissions
- Ensure no other app is using camera

### 2. Permission Denied
**Symptoms**: "Camera access denied" error
**Solutions**:
- Go to Settings > Safari > Camera > Allow
- Refresh the page
- Try again after allowing permissions

### 3. Camera Already in Use
**Symptoms**: "Camera is already in use" error
**Solutions**:
- Close other apps using camera
- Restart Safari
- Restart device if needed

### 4. Black Screen
**Symptoms**: Camera starts but shows black screen
**Solutions**:
- Check video element attributes
- Ensure playsInline is set
- Check for JavaScript errors

## Testing Checklist

### Development Environment
- [ ] Using HTTPS or localhost
- [ ] Testing on actual iOS device (not simulator)
- [ ] Using Safari browser
- [ ] Camera permissions granted

### Production Environment
- [ ] HTTPS enabled
- [ ] SSL certificate valid
- [ ] Domain properly configured
- [ ] CDN settings correct

## Debug Information

### Check Browser Support
```javascript
console.log('getUserMedia supported:', !!navigator.mediaDevices?.getUserMedia);
console.log('iOS device:', /iPad|iPhone|iPod/.test(navigator.userAgent));
console.log('Safari browser:', /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent));
```

### Check HTTPS
```javascript
console.log('HTTPS enabled:', window.location.protocol === 'https:' || window.location.hostname === 'localhost');
```

## Error Messages

| Error | Description | Solution |
|-------|-------------|----------|
| NotAllowedError | Permission denied | Allow camera access in Safari settings |
| NotFoundError | No camera found | Check device has camera |
| NotSupportedError | Browser doesn't support | Use Safari on iOS |
| SecurityError | HTTPS required | Enable HTTPS |
| AbortError | Access aborted | Try again |
| NotReadableError | Camera in use | Close other apps |

## Best Practices

1. **Always check HTTPS first**
2. **Use Safari for best compatibility**
3. **Provide clear error messages**
4. **Implement fallback mechanisms**
5. **Test on actual iOS devices**
6. **Handle permissions gracefully**

## Troubleshooting Steps

1. Check if HTTPS is enabled
2. Verify using Safari browser
3. Check camera permissions
4. Ensure no other app using camera
5. Restart Safari if needed
6. Check console for errors
7. Test on different iOS device
8. Verify SSL certificate

## Support

For additional support:
- Check browser console for errors
- Test on multiple iOS devices
- Verify network connectivity
- Contact development team 