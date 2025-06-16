import type { Viewer } from "cesium";
import { createContext } from "react";

interface CesiumViewerContextType {
  viewerRef: React.RefObject<HTMLDivElement | null>;
  viewerInstance: React.RefObject<Viewer | null>;
}

// Create the context with a default undefined value
export const CesiumViewerContext = createContext<
  CesiumViewerContextType | undefined
>(undefined);
