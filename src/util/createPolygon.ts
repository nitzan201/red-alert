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
import { getRandomItem } from "./util";

Label.enableRightToLeftDetection = true;

const polygonColorArray = [
  "rgb(120, 53, 15)", // Amber-950
  "rgb(220, 38, 38)", // Red-600
  "rgb(34, 197, 94)", // Green-500
  "rgb(59, 130, 246)", // Blue-500
  "rgb(202, 138, 4)", // Amber-600
];

/**
 * Converts a bounding box [latMin, latMax, lonMin, lonMax]
 * into a Turf FeatureCollection of corner points (and optional center).
 */
export function bboxToPoints(
  rawBBox: [string, string, string, string],
  includeCenter = false
) {
  const [latMin, latMax, lonMin, lonMax] = rawBBox.map(Number);

  const points = [
    point([lonMin, latMin], { id: "SW" }), // Southwest
    point([lonMin, latMax], { id: "NW" }), // Northwest
    point([lonMax, latMax], { id: "NE" }), // Northeast
    point([lonMax, latMin], { id: "SE" }), // Southeast
  ];

  if (includeCenter) {
    const centerLat = (latMin + latMax) / 2;
    const centerLon = (lonMin + lonMax) / 2;
    points.push(point([centerLon, centerLat], { id: "CENTER" }));
  }

  return points;
}

export const createPolygon = (viewer: Viewer, redAlertData: RedAlertData) => {
  // Convert to GeoJSON FeatureCollection
  const pointFeatures = featureCollection(
    redAlertData.alarmCites.length <= 2
      ? redAlertData.alarmCites
          .map((value) =>
            bboxToPoints(value.boundingbox as [string, string, string, string])
          )
          .flat()
      : redAlertData.alarmCites.map((coord) => point([coord.lon, coord.lat]))
  );

  // Generate a convex polygon (no crossing lines)
  const polygon = convex(pointFeatures);
  if (!polygon) throw Error("Polygon is NULL");
  const polylineCoord = Cartesian3.fromDegreesArray(
    polygon.geometry.coordinates[0].flat()
  );

  const materialColor = Color.fromCssColorString(
    getRandomItem(polygonColorArray)
  ).withAlpha(0.8);
  const entity = viewer.entities.add({
    id: redAlertData.id,
    name: redAlertData.title,
    polyline: {
      positions: polylineCoord,
      width: 5,
      material: materialColor,
      clampToGround: true,
    },
    position: polylineCoord[0],
    label: {
      text: `${redAlertData.desc}\n${new Date(
        redAlertData.timeStamp
      ).toLocaleString()}`,
      font: "16px sans-serif",
      fillColor: Color.WHITE,
      outlineColor: Color.fromCssColorString("rgb(146, 64, 14)"), // Tailwind amber-700
      outlineWidth: 3,
      style: LabelStyle.FILL_AND_OUTLINE,
      verticalOrigin: VerticalOrigin.BOTTOM,
      pixelOffset: new Cartesian2(0, 20),
      showBackground: true,
      backgroundColor: materialColor,
    },
  });
  viewer.scene.requestRender();
  return entity;
};

export const removeAllPolygon = (viewer: Viewer) => {
  viewer.entities.removeAll();
  viewer.scene.requestRender();
};
