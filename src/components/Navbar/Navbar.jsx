import { Link, Outlet } from "react-router-dom";

const navItems = [
  { name: "Home", to: "/" },
  { name: "Heatmap", to: "/heatmap" },
  { name: "Force", to: "/force" },
  { name: "Flower", to: "/flower" },
  { name: "Radial", to: "/radial" },
  { name: "Radial-all", to: "/radial-all" },
  { name: "Bar-all", to: "/bar-all" },
];

const Navbar = () => {
  return (
    <>
      <nav className="bg-base-300 p-4">
        <div className=" mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold">Navbar</div>
          <div className="hidden space-x-4 md:flex">
            {navItems.map((item, index) => (
              <Link key={index} className="" to={item.to}>
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      <div className="relative mx-auto mt-20 flex w-fit flex-col items-center justify-center p-2">
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
