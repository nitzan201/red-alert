import { useCallback, useEffect, useRef, useState } from "react";
import RedAlert from "./RedAlertClass";
import { useCesiumViewer } from "@/context/hook/useCesiumViewer";
import { createPolygon } from "@/util/createPolygon";
import type { RedAlertData } from "@/interface/interface";

const POLLING_INTERVAL = 10 * 1000; // 10 seconds
const HISTORY_LENGTH = 3;

function pushToFixedArray<T>(
  item: T,
  fixedArray: T[],
  onRemove?: (removeElement: T | undefined) => void
) {
  if (fixedArray.length >= HISTORY_LENGTH) {
    const removeElement = fixedArray.shift(); // remove first (oldest) item
    onRemove?.(removeElement);
  }
  fixedArray.push(item);
  return fixedArray;
}

export const useRedAlert = () => {
  const redAlertRef = useRef(new RedAlert());
  const { viewerInstance } = useCesiumViewer();
  const [activeLoop, setActiveLoop] = useState(true);
  const [alertsData, setAlertsData] = useState<RedAlertData[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchAndDisplayAlerts = useCallback(async () => {
    const viewer = viewerInstance.current;
    if (!viewer) return;

    try {
      const data = await redAlertRef.current.alarmCites();
      if (!data) return;

      setAlertsData((prev) =>
        pushToFixedArray(data, [...prev], (remove) => {
          if (remove) viewer.entities.removeById(remove?.id);
        })
      );
      createPolygon(viewer, data);
    } catch (error) {
      console.error("Failed to fetch red alert data:", error);
    }
  }, [viewerInstance]);

  useEffect(() => {
    if (!activeLoop || !viewerInstance.current) return;

    fetchAndDisplayAlerts();

    intervalRef.current = setInterval(fetchAndDisplayAlerts, POLLING_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [activeLoop, fetchAndDisplayAlerts, viewerInstance]);

  return { activeLoop, setActiveLoop, alertsData };
};
