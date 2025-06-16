import type { RedAlertData } from "@/interface/interface";
import { convex, featureCollection, point } from "@turf/turf";
import {
  Cartesian2,
  Cartesian3,
  Color,
  Label,
  LabelStyle,
  VerticalOrigin,
  type Viewer,
} from "cesium";

Label.enableRightToLeftDetection = true;

export const createPolygon = (viewer: Viewer, redAlertData: RedAlertData) => {
  // Convert to GeoJSON FeatureCollection
  const pointFeatures = featureCollection(
    redAlertData.alarmCites.map((coord) => point([coord.lon, coord.lat]))
  );

  // Generate a convex polygon (no crossing lines)
  const polygon = convex(pointFeatures);
  if (!polygon) throw Error("Polygon is NULL");
  const polylineCoord = Cartesian3.fromDegreesArray(
    polygon.geometry.coordinates[0].flat()
  );

  viewer.entities.add({
    id:redAlertData.id,
    name: redAlertData.title,
    polyline: {
      positions: polylineCoord,
      width: 5,
      material: Color.fromCssColorString("rgb(120, 53, 15)").withAlpha(0.8), // Tailwind amber-950
      clampToGround: true,
    },
    position: polylineCoord[0],
    label: {
      text: redAlertData.desc,
      font: "16px sans-serif",
      fillColor: Color.WHITE,
      outlineColor: Color.fromCssColorString("rgb(146, 64, 14)"), // Tailwind amber-700
      outlineWidth: 3,
      style: LabelStyle.FILL_AND_OUTLINE,
      verticalOrigin: VerticalOrigin.BOTTOM,
      pixelOffset: new Cartesian2(0, -20),
      showBackground: true,
      backgroundColor: Color.fromCssColorString("rgba(120, 53, 15, 0.7)"), // amber-950 w/ opacity
    },
  });
  viewer.scene.requestRender();
};

export const removeAllPolygon = (viewer: Viewer) => {
  viewer.entities.removeAll();
  viewer.scene.requestRender();
};
