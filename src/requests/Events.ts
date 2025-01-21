import ChurchApi from "./ChurchApi";

const EventService = {
  get() {
    return ChurchApi.get("/parish-events");
  },
};

export default EventService;
