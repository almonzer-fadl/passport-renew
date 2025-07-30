import React, { useState } from 'react';
import { 
    debugCameraInfo, 
    testCameraAccess, 
    getCameraAccessTips,
    checkHTTPS,
    checkCameraSupport
} from './image_preprocessing.js';

export default function CameraDebug() {
    const [debugInfo, setDebugInfo] = useState(null);
    const [testResult, setTestResult] = useState(null);
    const [isTesting, setIsTesting] = useState(false);

    const runDebug = () => {
        const info = debugCameraInfo();
        setDebugInfo(info);
    };

    const runCameraTest = async () => {
        setIsTesting(true);
        try {
            const success = await testCameraAccess();
            setTestResult(success ? 'Camera test passed!' : 'Camera test failed!');
        } catch (error) {
            setTestResult(`Camera test error: ${error.message}`);
        } finally {
            setIsTesting(false);
        }
    };

    const tips = getCameraAccessTips();

    return (
        <div className="p-4 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-bold mb-4">Camera Debug Tools</h3>
            
            <div className="space-y-4">
                <div>
                    <button 
                        onClick={runDebug}
                        className="btn btn-primary mr-2"
                    >
                        Run Debug Info
                    </button>
                    <button 
                        onClick={runCameraTest}
                        disabled={isTesting}
                        className="btn btn-secondary"
                    >
                        {isTesting ? 'Testing...' : 'Test Camera Access'}
                    </button>
                </div>

                {debugInfo && (
                    <div className="bg-white p-4 rounded border">
                        <h4 className="font-bold mb-2">Debug Information:</h4>
                        <pre className="text-sm overflow-auto">
                            {JSON.stringify(debugInfo, null, 2)}
                        </pre>
                    </div>
                )}

                {testResult && (
                    <div className={`alert ${testResult.includes('passed') ? 'alert-success' : 'alert-error'}`}>
                        <span>{testResult}</span>
                    </div>
                )}

                <div className="bg-blue-50 p-4 rounded border">
                    <h4 className="font-bold mb-2">Camera Access Tips:</h4>
                    <ul className="list-disc list-inside space-y-1">
                        {tips.map((tip, index) => (
                            <li key={index} className="text-sm">{tip}</li>
                        ))}
                    </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded border">
                    <h4 className="font-bold mb-2">Quick Checks:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>HTTPS enabled: {checkHTTPS() ? '✅' : '❌'}</li>
                        <li>Camera supported: {checkCameraSupport() ? '✅' : '❌'}</li>
                        <li>iOS device: {/iPad|iPhone|iPod/.test(navigator.userAgent) ? '✅' : '❌'}</li>
                        <li>Safari browser: {/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) ? '✅' : '❌'}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
} 