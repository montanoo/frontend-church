import HeaderLink from "../HeaderLink/HeaderLink";

export interface Route {
  name: string;
  href: string;
  adminOnly?: boolean;
}

export const routes: Route[] = [
  { name: "Eventos", href: "/" },
  { name: "Libros parroquiales", href: "/books" },
  { name: "Finanzas", href: "/finances" },
  { name: "Administración de usuarios", href: "/administration", adminOnly: true },
];

export default function Header() {
  
  const isAdmin = true; 

  const filteredRoutes = routes.filter((route) => !route.adminOnly || isAdmin);

  return (
    <header className="w-full overflow-hidden bg-[#FFFF]">
      <div className="max-w-[800px] mx-auto p-4">
        <nav className="hidden md:flex justify-center">
          {/* Contenedor centrado */}
          <div className="flex space-x-6">
            {filteredRoutes.map((route, idx) => (
              <HeaderLink route={route} key={idx} />
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
