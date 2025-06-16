import { getRedAlerts } from "@/request/getRedAlert";
import type {
  DistrictWithLocation,
  LocationsObj,
  RedAlertData,
} from "@/interface/interface";
import { getCityLocationReq } from "@/request/getCityLocationReq";
import citiesLocation from "@data/citiesLocation.json";
import MockAlertJson from "@data/mock/mockRedAlertData0.json";
import MockAlertJson1 from "@data/mock/mockRedAlertData1.json";
import { getRandomItem } from "@/util/util";

const randomMock = () =>
  getRandomItem([MockAlertJson, MockAlertJson1, undefined]);

const isMock = false;

class RedAlert {
  locations: LocationsObj = citiesLocation;

  async getCityLocation(city: string) {
    const data = await getCityLocationReq(city);
    if (data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
        boundingbox: data[0].boundingbox,
      };
    } else {
      console.warn(`City not found ${city}`);
      return null;
    }
  }

  randomCoordinates(latitude: number, longitude: number) {
    const circle_r = 1;
    const circle_x = latitude;
    const circle_y = longitude;

    const alpha = 2 * Math.PI * Math.random();
    const r = circle_r * Math.random();

    const x = r * Math.cos(alpha) + circle_x;
    const y = r * Math.sin(alpha) + circle_y;

    return { latitude: x, longitude: y };
  }

  countAlerts(alertsData: string[]): number {
    return alertsData.length;
  }

  async getRedAlerts() {
    const response = isMock ? randomMock() : await getRedAlerts();

    const alertsText = response?.data;
    if (!alertsText || alertsText.length <= 1) {
      return null;
    }

    const alertData = {
      alertsText,
      timeStamp: Date.now(),
      title: response.title,
      desc: response.desc,
      id: isMock ? Date.now().toString() : response.id,
    };

    return alertData;
  }

  public async alarmCites(): Promise<RedAlertData | undefined> {
    const alertData = await this.getRedAlerts();
    if (!alertData) return;

    const alarmCites: DistrictWithLocation[] = [];
    alertData.alertsText.forEach((cityName) => {
      const data = this.locations[cityName];
      if (data) alarmCites.push(data);
      else console.warn(`${cityName} dost exists in the DB`);
    });
    return { alarmCites, ...alertData };
  }
}

export default RedAlert;
