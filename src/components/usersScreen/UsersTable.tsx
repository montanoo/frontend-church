import Button from "./Button";
import { IUsersData } from "@/types/UserTypes";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

type Props = {
  users: IUsersData[];
  onEdit: (user: IUsersData) => void;
  onDelete: (id: number) => void;
};

export default function UsersTable({ users, onEdit, onDelete }: Props) {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Usuario</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Rol</th>
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{user.id}</td>
              <td className="border border-gray-300 px-4 py-2">{user.username}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                user.role === "admin" ? "bg-blue-100 text-blue-800" : "bg-gray-200 text-gray-800"
              }`}>
                {user.role}
              </span>
              </td>
              <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-2 flex-shrink-0">
              <Button
                text="Editar"
                onClick={() => onEdit(user)}
                variant="muted"
                icon={<PencilSquareIcon className="h-4 w-4" />}
              />

              <Button
                text="Eliminar"
                onClick={() => onDelete(user.id)}
                variant="danger"
                icon={<TrashIcon className="h-4 w-4" />}
              />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
