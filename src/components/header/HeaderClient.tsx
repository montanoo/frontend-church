"use client";

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import HeaderLink from "../HeaderLink/HeaderLink";
import { Fragment } from "react";
import { useRouter } from "next/navigation";
import ChurchApi from "@/requests/ChurchApi";

export interface Route {
  name: string;
  href: string;
  adminOnly?: boolean;
}

const routes: Route[] = [
  { name: "Eventos", href: "/" },
  { name: "Libros parroquiales", href: "/books" },
  { name: "Finanzas", href: "/finances" },
  { name: "Administración", href: "/administration", adminOnly: true },
];

export default function HeaderClient({ user }: { user: any }) {
  const isAdmin = user?.role === "admin";
  const filteredRoutes = routes.filter((route) => !route.adminOnly || isAdmin);
  const router = useRouter();

  return (
    <header className="relative w-full bg-white z-50">
      <div className="max-w-[1300px] mx-auto p-4 z-50">
        <nav className="hidden md:flex justify-center z-50">
          <div className="flex space-x-6 items-center z-50">
            {filteredRoutes.map((route, idx) => (
              <HeaderLink route={route} key={idx} />
            ))}

            <Menu as="div" className="relative inline-block text-left z-50">
              <div>
                <MenuButton className="flex items-center space-x-1 text-gray-700 hover:text-black focus:outline-none">
                  <UserCircleIcon className="w-8 h-8" />
                  <span className="hidden md:inline text-sm">
                    {user?.username}
                  </span>
                </MenuButton>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1">
                    <MenuItem>
                      {() => (
                        <button
                          onClick={async () => {
                            await ChurchApi.post("auth/logout");
                            router.push("/auth");
                          }}
                          className={`w-full text-left px-4 py-2 text-sm text-gray-700`}
                        >
                          Cerrar sesión
                        </button>
                      )}
                    </MenuItem>
                  </div>
                </MenuItems>
              </Transition>
            </Menu>
          </div>
        </nav>
      </div>
    </header>
  );
}
