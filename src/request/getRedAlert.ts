import type { RocketAlert } from "@/interface/interface";
import axios from "axios";

// const HOST = "https://www.oref.org.il/WarningMessages/alert/alerts.json";
const LOCAL_ROUTE = "http://localhost:3000/api/alerts";

export const getRedAlerts = async () => {
  return (await axios.get<RocketAlert | null>(LOCAL_ROUTE)).data;
};
