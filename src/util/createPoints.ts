import type { RedAlertData } from "@/interface/interface";
import {
  Cartesian2,
  Cartesian3,
  Color,
  CustomDataSource,
  LabelStyle,
  VerticalOrigin,
  type Viewer,
} from "cesium";

export const createPoints = (viewer: Viewer, redAlertData: RedAlertData) => {
  const pointsGroup = new CustomDataSource(redAlertData.id);
  redAlertData.alarmCites.forEach((cities) => {
    pointsGroup.entities.add({
      position: Cartesian3.fromDegrees(cities.lon, cities.lat),
      point: {
        pixelSize: 10,
        color: Color.RED,
      },
      name: cities.label,
      label: {
        text: cities.label,
        font: "16px sans-serif",
        fillColor: Color.WHITE,
        outlineColor: Color.fromCssColorString("rgb(146, 64, 14)"), // Tailwind amber-700
        outlineWidth: 3,
        style: LabelStyle.FILL_AND_OUTLINE,
        verticalOrigin: VerticalOrigin.BOTTOM,
        pixelOffset: new Cartesian2(0, -20),
        showBackground: true,
      },
    });
  });
  viewer.dataSources.add(pointsGroup);
  pointsGroup.show = true;
  viewer.scene.requestRender();
  return pointsGroup;
};
