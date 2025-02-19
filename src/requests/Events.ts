import ChurchApi from "./ChurchApi";
import { IParishEventsData } from "../types/ParishEventsTypes";

const EventService = {
  async get() {
    return await ChurchApi.get("/parish-events");
  },

  async post(data: IParishEventsData) {
    return await ChurchApi.post("/parish-events", {...data});
  },
};

export default EventService;
