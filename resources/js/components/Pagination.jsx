import React from "react";
import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
  return (
    <nav className="flex items-center justify-center gap-1">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.url || '#'}
          className={`
            px-4 py-2 rounded-md
            ${link.active ? 'bg-primary text-white' : 'bg-white text-gray-700'}
            ${!link.url ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}
          `}
          dangerouslySetInnerHTML={{ __html: link.label }}
        />
      ))}
    </nav>
  );
}