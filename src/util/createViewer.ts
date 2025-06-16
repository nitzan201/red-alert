import { type RefObject } from "react";
import { DataSourceDisplay, ImageryLayer, Ion, IonImageryProvider, Viewer } from "cesium";
import "@cesium/engine/Source/Widget/CesiumWidget.css";
import { wgs84ToCartesian3 } from "@/util/convertTool";
import { ISRAEL_COORDINATE } from "@/const/const";
import { viewerPram } from "@/const/viewerConst";

const originalUpdate = DataSourceDisplay.prototype.update;
let prevResult = false;

DataSourceDisplay.prototype.update = function(time) {
  const result = originalUpdate.call(this, time);
  if (!prevResult && result) {
    this._scene.requestRender();
  }
  prevResult = result;
}

export const createViewer = async (
  viewerContainer: RefObject<HTMLDivElement | null>,
  viewerRef: RefObject<Viewer | null>
) => {
  Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ACCESS_TOKEN;

  if (!viewerContainer.current || viewerRef.current) return;
  const baseLayer = ImageryLayer.fromProviderAsync(
    IonImageryProvider.fromAssetId(4)
  );
  const viewer = new Viewer(viewerContainer.current, {
    baseLayer: baseLayer,
    ...viewerPram,
  });

  viewer.camera.flyTo({
    destination: wgs84ToCartesian3(
      ISRAEL_COORDINATE[0],
      ISRAEL_COORDINATE[1],
      500000
    ),
  });
  viewerRef.current = viewer;
};
