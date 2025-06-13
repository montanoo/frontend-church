import ChurchApi from "./ChurchApi";
import { IFinanceTransaction } from "../types/FinanceTypes";

const FinanceService = {
  async get() {
    return await ChurchApi.get("/transactions");
  },

  async post(data: IFinanceTransaction) {
    return await ChurchApi.post("/transactions", { ...data });
  },
};

export default FinanceService;
