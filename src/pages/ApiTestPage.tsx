import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ApiTestPage = () => {
  const [testResult, setTestResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const testApiConnection = async () => {
    setIsLoading(true);
    setTestResult("Testing connection...");
    
    try {
      // Determine API URL based on environment
      const API_URL = import.meta.env.VITE_API_URL || 
        (window.location.hostname === 'localhost' ? '/api' : 'https://synnectify-backend.onrender.com/api');
      
      console.log('Testing API connection to:', API_URL);
      
      // Add timeout to fetch request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
      
      const response = await fetch(`${API_URL}/ping`, {
        method: "GET",
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      const data = await response.json();
      
      if (response.ok) {
        setTestResult(`✅ Success! API is responding.\nStatus: ${response.status}\nMessage: ${data.message}\nEnvironment: ${data.environment}`);
      } else {
        setTestResult(`❌ API returned error.\nStatus: ${response.status}\nMessage: ${data.error || data.message}`);
      }
    } catch (error: any) {
      console.error('API test error:', error);
      
      // Handle timeout specifically
      if (error.name === 'AbortError') {
        setTestResult("⏰ Request timeout - the server is taking too long to respond.");
      } else if (error instanceof TypeError) {
        setTestResult(`🌐 Network error: ${error.message}
This could be due to:
1. Server being down
2. Network connectivity issues
3. CORS policy restrictions`);
      } else {
        setTestResult(`❌ Unexpected error: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">API Connection Test</h1>
          
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-blue-800 mb-2">Test Purpose</h2>
              <p className="text-blue-700">
                This page tests the connection between your frontend and backend API to diagnose connectivity issues.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={testApiConnection}
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-orange-500 to-blue-500 text-white font-medium py-3 px-6 rounded-lg hover:from-orange-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Testing...
                  </span>
                ) : (
                  "Test API Connection"
                )}
              </button>
              
              <button
                onClick={() => navigate("/")}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-300"
              >
                Back to Home
              </button>
            </div>
            
            {testResult && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Test Results</h3>
                <pre className="bg-gray-100 border border-gray-300 rounded-lg p-4 whitespace-pre-wrap text-sm font-mono">
                  {testResult}
                </pre>
              </div>
            )}
            
            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Troubleshooting Tips</h3>
              <ul className="text-yellow-700 list-disc pl-5 space-y-1">
                <li>If you see a timeout error, the backend server may be sleeping or down</li>
                <li>If you see a network error, check your internet connection</li>
                <li>If you see CORS errors, the backend may not be configured to accept requests from your domain</li>
                <li>For Render deployments, the first request may take longer as the server wakes up</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiTestPage;