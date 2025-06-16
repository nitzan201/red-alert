import { createViewer } from "@/util/createViewer";
import type { Viewer } from "cesium";
import { useRef, useState, useEffect } from "react";
import { CesiumViewerContext } from "./context";

// Define the props for the CesiumViewerProvider
interface CesiumViewerProviderProps {
  children: React.ReactNode;
}

/**
 * Provides the Cesium viewer references (DOM ref and Cesium Viewer instance ref)
 * to its children via Context.
 *
 * It initializes and cleans up the Cesium Viewer.
 */
export const CesiumViewerProvider: React.FC<CesiumViewerProviderProps> = ({
  children,
}) => {
  // useRef for the DOM element where the Cesium viewer will be mounted
  const viewerRef = useRef<HTMLDivElement | null>(null);
  // useRef for the Cesium Viewer instance
  const viewerInstance = useRef<Viewer | null>(null);

  // State to indicate if the viewer has been initialized
  const [isViewerReady, setIsViewerReady] = useState(false);

  useEffect(() => {
    // Call the provided createViewer function to initialize the Cesium Viewer
    if (viewerRef.current && !viewerInstance.current) {
      createViewer(viewerRef, viewerInstance);
      setIsViewerReady(true); // Set ready after viewer creation attempt
    }

    // Cleanup function: destroy the Cesium Viewer when the component unmounts
    return () => {
      if (viewerInstance.current) {
        viewerInstance.current.destroy();
        viewerInstance.current = null;
        setIsViewerReady(false);
      }
    };
  }, []);

  const contextValue = { viewerRef, viewerInstance };

  return (
    <CesiumViewerContext.Provider value={contextValue}>
      <div ref={viewerRef} style={{ height: "100vh", width: "100%" }}>
        {isViewerReady ? (
          children
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-gray-900 text-white">
            Loading Cesium Viewer...
          </div>
        )}
      </div>
    </CesiumViewerContext.Provider>
  );
};
