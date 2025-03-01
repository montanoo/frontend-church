import ChurchApi from "./ChurchApi";

const ParishService = {
    async get() {
      return await ChurchApi.get("/parishes");
    },
  };
  
  export default ParishService;