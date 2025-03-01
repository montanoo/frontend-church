import ChurchApi from "./ChurchApi";
import { IEventOrganizerData } from "../types/EventOrganizerTypes";

const EventOrganizerService = {
    async post(data: IEventOrganizerData) {
      return await ChurchApi.post("/event-organizers", {...data});
    },
    
    async get() {
      const response = await ChurchApi.get("/event-organizers");
      return response.data;
    },
  };

  export default EventOrganizerService;