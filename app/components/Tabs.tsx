"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Tabs = () => {
  const pathname = usePathname();
  const tabs = [
    { name: "  Image analysis", href: "/" },
    { name: "  Ingredient recognition", href: "/trigger-ing" },
    { name: "  Image creator", href: "/trigger-crt" },
  ];
  return (
    <div className="p-1 bg-[#F4F4F5] flex rounded-md items-center ">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={` ${isActive ? "py-1 px-3 bg-white rounded-md" : "py-1 px-3"}`}
          >
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
};
