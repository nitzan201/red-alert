export type City = {
  label: string;
  rashut: string;
  value: string;
  id: string;
  areaid: number;
  mixname: string;
  color: string;
};

export type District = {
  label: string;
  value: string | null;
  id: string;
  areaid: number;
  areaname: string;
  label_he: string;
  migun_time: number;
  city_data?: City | null;
};

export type DistrictWithLocation = District & {
  lon: number;
  lat: number;
  boundingbox: string[];
};

export type LocationsObj = Record<string, DistrictWithLocation>;

export interface RocketAlert {
  id: string;
  cat: string;
  title: string;
  data: string[];
  desc: string;
}

export interface LocationResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: [string, string, string, string];
}
export interface RedAlertData {
  id: string;
  alertsText: string[];
  timeStamp: number;
  title: string;
  desc: string;
  alarmCites: DistrictWithLocation[];
}
