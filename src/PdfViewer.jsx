import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "./api/axiosInstance";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PdfViewer = () => {
  const { type } = useParams();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Create the plugin instance once instead of on every render
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  
  useEffect(() => {
    const fetchPdf = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await axiosInstance.get(`/api/menu/${type}/download`, {
          responseType: "blob",
        });
        
        // Check if the response is actually a PDF
        if (response.data.type !== "application/pdf") {
          throw new Error("The server did not return a PDF file");
        }
        
        const url = URL.createObjectURL(response.data);
        setPdfUrl(url);
        setLoading(false);
      } catch (error) {
        console.error("Error loading PDF:", error);
        setError(error.message || "Failed to load PDF");
        setLoading(false);
      }
    };
    
    fetchPdf();
    
    // Cleanup function to prevent memory leaks
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [type]);
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
          <p className="ml-3">Loading PDF...</p>
        </div>
      ) : error ? (
        <div className="text-red-600 bg-red-100 rounded-lg">
          <p>Error: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="w-full h-full border shadow-lg bg-white rounded-lg">
          <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js">
            <Viewer 
              fileUrl={pdfUrl} 
              plugins={[defaultLayoutPluginInstance]}
              onError={(error) => setError(error.message)}
            />
          </Worker>
        </div>
      )}
    </div>
  );
};

export default PdfViewer;