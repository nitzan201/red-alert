import { useCallback, useEffect, useRef, useState } from "react";
import RedAlert from "./RedAlertClass";
import { useCesiumViewer } from "@/context/hook/useCesiumViewer";
import { createPolygon } from "@/util/createPolygon";
import type { RedAlertData } from "@/interface/interface";
import { createPoints } from "@/util/createPoints";
import { EntityType } from "@/interface/enum";

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
      if (alertsData.some((alertD) => alertD.id === data.id)) return;

      setAlertsData((prev) =>
        pushToFixedArray(data, [...prev], (remove) => {
          if (!remove) return;
          viewer.entities.removeById(remove?.id);
          viewer.dataSources.remove(
            viewer.dataSources.getByName(remove.id)?.[0]
          );
        })
      );

      createPolygon(viewer, data);
      createPoints(viewer, data);
    } catch (error) {
      console.error("Failed to fetch red alert data:", error);
    }
  }, [alertsData, viewerInstance]);

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

  const toggleEntityVisibility = (
    id: string,
    entityType: EntityType,
    show: boolean
  ) => {
    const viewer = viewerInstance.current;
    if (!viewer) return;
    if (entityType === EntityType.Polygon) {
      const entity = viewer.entities.getById(id);
      if (entity) entity.show = show;
    } else if (entityType === EntityType.Points) {
      const dataSource = viewer.dataSources.getByName(id)[0];
      if (dataSource) dataSource.show = show;
      viewer.scene.requestRender();
    }
  };

  return { activeLoop, setActiveLoop, alertsData, toggleEntityVisibility };
};
