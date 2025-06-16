import { Terrain } from "cesium";

export const viewerPram = {
  terrain: Terrain.fromWorldTerrain(),
  baseLayerPicker: false,
  requestRenderMode: true,
  animation: false, // Disables the animation widget
  fullscreenButton: false, // Disables the fullscreen button
  vrButton: false, // Disables the VR button
  geocoder: false, // Disables the geocoder search bar
  homeButton: false, // Disables the home button
  infoBox: false, // Disables the info box
  sceneModePicker: false, // Disables the scene mode picker
  selectionIndicator: false, // Disables the selection indicator
  timeline: false, // Disables the timeline
  navigationHelpButton: false, // Disables the navigation help button
};
