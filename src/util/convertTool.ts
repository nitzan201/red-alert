import { Cartesian3, Cartographic, Math as CesiumMath } from "cesium";

/**
 * Convert WGS84 (longitude, latitude, height) to Cartesian3
 * @param lon Longitude in degrees
 * @param lat Latitude in degrees
 * @param height Height in meters (optional, default = 0)
 * @returns Cartesian3 position
 */
export function wgs84ToCartesian3(
  lon: number,
  lat: number,
  height: number = 0
): Cartesian3 {
  return Cartesian3.fromDegrees(lon, lat, height);
}

/**
 * Convert Cartesian3 to WGS84 (lon, lat, height)
 * @param position Cartesian3 point
 * @returns [lon, lat, height]
 */
export function cartesian3ToWgs84(
  position: Cartesian3
): [number, number, number] {
  const cartographic = Cartographic.fromCartesian(position);
  return [
    CesiumMath.toDegrees(cartographic.longitude),
    CesiumMath.toDegrees(cartographic.latitude),
    cartographic.height,
  ];
}
