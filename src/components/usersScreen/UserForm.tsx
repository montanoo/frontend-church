import Input from "./Input";
import Button from "./Button";
import {
  PlusCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

type Props = {
  newUser: {
    username: string;
    email: string;
    password: string;
    role: "normalUser" | "admin";
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRoleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSubmit: () => void;
};

export default function UserForm({
  newUser,
  onChange,
  onRoleChange,
  onSubmit,
}: Props) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-5 gap-3">
        <Input
          placeholder="Usuario"
          name="username"
          value={newUser.username}
          onChange={onChange}
        />
        <Input
          placeholder="Email"
          name="email"
          value={newUser.email}
          onChange={onChange}
        />
        <Input
          placeholder="Contraseña"
          type="password"
          name="password"
          value={newUser.password}
          onChange={onChange}
        />
        <select
          name="role"
          value={newUser.role}
          onChange={onRoleChange}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="admin">Admin</option>
          <option value="normalUser">Usuario Normal</option>
        </select>
        <Button
          text="Agregar Usuario"
          onClick={onSubmit}
          variant="primary"
          icon={<PlusCircleIcon className="h-5 w-5" />}
        />
      </div>
    </div>
  );
}
