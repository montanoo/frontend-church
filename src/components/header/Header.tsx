import HeaderLink from "../HeaderLink/HeaderLink";

export interface Route {
  name: string;
  href: string;
}

export const routes: Route[] = [
  { name: "Eventos", href: "/" },
  { name: "Libros parroquiales", href: "/books" },
  { name: "Estados financieros", href: "/finances" },
];

export default function Header() {
  return (
    <header className="w-full overflow-hidden bg-[#BD89F1]" >
      <div className="max-w-[675px] mx-auto p-4" >
        <nav className="hidden md:flex justify-between">
          <div className="flex space-x-14">
            {routes.map((route, idx) => (
              <HeaderLink route={route} key={idx} />
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
