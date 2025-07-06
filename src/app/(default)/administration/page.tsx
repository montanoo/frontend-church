"use client";
import { useEffect, useState } from "react";
import UsersService from "@/requests/Users";
import { IUsersData } from "@/types/UserTypes";

import Notification from "@/components/usersScreen/Notification";
import UserForm from "@/components/usersScreen/UserForm";
import UserEditForm from "@/components/usersScreen/UserEditForm";
import UsersTable from "@/components/usersScreen/UsersTable";
import useConfirmModal from "@/hooks/useConfirmModal";

export default function UserManagement() {
  const [users, setUsers] = useState<IUsersData[]>([]);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "normalUser" as "normalUser" | "admin",
  });
  const [selectedUser, setSelectedUser] = useState<IUsersData | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const { confirm, Modal: ConfirmModalPortal } = useConfirmModal();
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await UsersService.get();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setNotification({ message: "Error fetching users", type: "error" });
    }
  };

  const handleAddUser = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newUser.username || !newUser.email || !newUser.password) {
      setNotification({ message: "Por favor, completa todos los campos.", type: "error" });
      return;
    }
    if (!emailRegex.test(newUser.email)) {
      setNotification({ message: "Por favor, ingresa un email válido.", type: "error" });
      return;
    }
    try {
      await UsersService.post(newUser);
      setNewUser({ username: "", email: "", password: "", role: "normalUser" });
      fetchUsers();
      setNotification({ message: "Usuario agregado exitosamente.", type: "success" });
    } catch (error) {
      console.error("Error adding user:", error);
      setNotification({ message: "Error al agregar usuario.", type: "error" });
    }
  };

  const handleEditUser = async () => {
    if (!selectedUser) return;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(selectedUser.email)) {
      setNotification({ message: "El email no tiene un formato válido.", type: "error" });
      return;
    }
    try {
      await UsersService.put(selectedUser);
      setSelectedUser(null);
      fetchUsers();
      setNotification({ message: "Usuario actualizado exitosamente.", type: "success" });
    } catch (error) {
      console.error("Error updating user:", error);
      setNotification({ message: "Error al actualizar usuario.", type: "error" });
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await UsersService.delete(id);
      fetchUsers();
      setNotification({ message: "Usuario eliminado exitosamente.", type: "success" });
    } catch (error) {
      console.error("Error deleting user:", error);
      setNotification({ message: "Error al eliminar usuario.", type: "error" });
    }
  };

  const askDeleteUser = (user: IUsersData) => {
    confirm({
      title: "¿Eliminar Usuario?",
      message: `¿Estás seguro de eliminar a "${user.username}"? Esta acción no se puede deshacer.`,
      onConfirm: async () => {
        await handleDeleteUser(user.id);
      },
    });
  };

  return (
    <div className="p-6">
      {notification && <Notification message={notification.message} type={notification.type} />}

      <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>

      <UserForm
        newUser={newUser}
        onChange={(e) => setNewUser({ ...newUser, [e.target.name]: e.target.value })}
        onRoleChange={(e) => setNewUser({ ...newUser, role: e.target.value as "normalUser" | "admin" })}
        onSubmit={handleAddUser}
      />

      <div className="border-t border-gray-300 my-6" />

      {selectedUser && (
        <UserEditForm
          user={selectedUser}
          onChange={setSelectedUser}
          onSubmit={handleEditUser}
          onCancel={() => setSelectedUser(null)}
        />
      )}

      <UsersTable
        users={users}
        onEdit={setSelectedUser}
        onDelete={(id) => {
          const user = users.find((u) => u.id === id);
          if (user) askDeleteUser(user);
        }}
      />

      {/* Reusable confirmation modal portal */}
      {ConfirmModalPortal}
    </div>
  );
}
