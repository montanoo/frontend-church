import ChurchApi from "./ChurchApi";
import { IUsersData } from "../types/UserTypes";

const UsersService = {
  async post(data: Omit<IUsersData, "id">) {
    return await ChurchApi.post("/users", data); // Create a new user
  },

  async get() {
    const response = await ChurchApi.get("/users");
    return response.data; // Fetch all users
  },

  async put(data: IUsersData) {
    return await ChurchApi.put(`/users/${data.id}`, data); // Update user by ID
  },

  // DELETE method to remove a user by ID
  async delete(id: number) {
    return await ChurchApi.delete(`/users/${id}`); // Delete user by ID
  },
};

export default UsersService;
