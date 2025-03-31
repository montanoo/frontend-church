import Input from "./Input";
import Button from "./Button";
import { IUsersData } from "@/types/UserTypes";
import {
  PlusCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";


type Props = {
  user: IUsersData;
  onChange: (updatedUser: IUsersData) => void;
  onSubmit: () => void;
  onCancel: () => void;
};

export default function UserEditForm({ user, onChange, onSubmit, onCancel }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...user, [name]: value });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">
  Editar Usuario: <span className="text-gray-700">{user.username}</span>
</h2>

      <div className="grid grid-cols-5 gap-3 items-center">
        <Input placeholder="Usuario" name="username" value={user.username} onChange={handleChange} />
        <Input placeholder="Email" name="email" value={user.email} onChange={handleChange} />
        <Input placeholder="Contraseña" name="password" type="password" value={user.password} onChange={handleChange} />
        <select name="rol" value={user.role} onChange={handleChange} className="px-4 py-2 border rounded-lg">
          <option value="admin">Admin</option>
          <option value="normalUser">Usuario Normal</option>
        </select>
        <div className="flex space-x-2">
          <Button
            text="Guardar"
            onClick={onSubmit}
            variant="primary"
            icon={<CheckCircleIcon className="h-5 w-5" />}
          />
          <Button
            text="Cancelar"
            onClick={onCancel}
            variant="muted"
            icon={<XCircleIcon className="h-5 w-5" />}
          />
        </div>
      </div>
    </div>
  );
}

