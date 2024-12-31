import { ILoginUserData } from "../types/AuthTypes";
import ChurchApi from "./ChurchApi";

const AuthService = {
  login(data: ILoginUserData) {
    return ChurchApi.post("/auth/login", { ...data });
  },
};

export default AuthService;
