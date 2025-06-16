import type { LocationResult } from "@/interface/interface";
import axios from "axios";

export const getCityLocationReq = async (city: string) => {
  const response = await axios.get<LocationResult[]>(
    `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
      city
    )}&country=Israel&format=json`,
    {
      headers: {
        setUserAgent: `red alert (${import.meta.env.VITE_MAIL})`,
      },
    }
  );
  return response.data;
};
