import { Link } from "react-router";
import { ExternalLink } from "lucide-react";
import { AdminHeader, card } from "./adminUi.jsx";

const pages = [
  { title: "Home", path: "/", note: "Hero, shop by room, blog cards" },
  { title: "Shop", path: "/shop", note: "Product catalog" },
  { title: "About / Our Story", path: "/about", note: "Brand story" },
  { title: "Contact", path: "/contact", note: "Form, map, WhatsApp" },
  { title: "Terms & Conditions", path: "/terms", note: "Legal — edit src/pages/Terms.jsx" },
  { title: "Privacy Policy", path: "/privacy", note: "Legal — edit src/pages/Privacy.jsx" },
  { title: "Return Policy", path: "/returns", note: "Legal — edit src/pages/Returns.jsx" },
];

function AdminPages() {
  return (
    <div>
      <AdminHeader
        title="Pages"
        subtitle="Storefront pages. Open a page on the site, or edit the file in the project."
      />
      <div className={`${card} divide-y divide-[#eadfd3]`}>
        {pages.map((page) => (
          <div
            key={page.path}
            className="flex flex-wrap items-center justify-between gap-3 px-4 py-4"
          >
            <div>
              <p className="font-medium text-[#111827]">{page.title}</p>
              <p className="text-xs text-[#6b7280]">
                {page.path} · {page.note}
              </p>
            </div>
            <Link
              to={page.path}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#eadfd3] px-3 py-2 text-xs uppercase tracking-wider text-[#6B4423] hover:bg-[#f7f4ef]"
            >
              View <ExternalLink size={12} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPages;
