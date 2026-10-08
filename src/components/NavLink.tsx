//server
import Link from "next/link";

interface Navs {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLink = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}/api/bazardor/categories`);
  // "https://api.api-store.workers.dev/api/bazardor/categories"

  const data = await res.json();
  const navs: Navs[] = data;

  return (
    <div className="w-full bg-base-200">
      <div className="container mx-auto flex gap-5 mt-3  py-4">
        {navs.map((n, i) => (
          <Link key={i} href={n.id}>
            {n.icon} {n.nameBn}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavLink;
