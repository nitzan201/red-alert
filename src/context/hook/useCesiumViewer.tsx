import { useContext } from "react";
import { CesiumViewerContext } from "@context/context";

/**
 * Custom hook to consume the CesiumViewerContext.
 *
 * Throws an error if used outside of a CesiumViewerProvider.
 */
export const useCesiumViewer = () => {
  const context = useContext(CesiumViewerContext);
  if (context === undefined) {
    throw new Error(
      "useCesiumViewer must be used within a CesiumViewerProvider"
    );
  }
  return context;
};
