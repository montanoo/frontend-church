import ChurchApi from "./ChurchApi";
import { IHallData } from "../types/HallTypes";

const HallService = {
  async post(data: IHallData) {
    return await ChurchApi.post("/halls", {...data});
  },

  async get() {
    const response = await ChurchApi.get("/halls");
    return response.data;
  },
};

export default HallService;