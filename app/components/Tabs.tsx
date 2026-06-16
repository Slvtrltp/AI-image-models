import Link from "next/link";
import { usePathname } from "next/navigation";

export const Tabs = ({ tab }: { tab?: () => void }) => {
  const pathname = usePathname();
  const tabs = [
    { name: "  Image analysis", href: "/" },
    { name: "  Ingredient recognition", href: "/trigger-ing" },
    { name: "  Image creator", href: "/trigger-crt" },
  ];
  return (
    <div className="p-1 bg-[#F4F4F5] flex rounded-md items-center">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return <Link></Link>;
      })}
    </div>
  );
};
{
  /* <Link
        href="/"
        className={`${tab ? "py-1 px-3 bg-white rounded-md" : ""}`}
      >
        Image analysis
      </Link>
      <Link
        href="/trigger-ing"
        className={`${tab ? "py-1 px-3 bg-white rounded-md" : ""}`}
      >
        Ingredient recognition
      </Link>
      <Link
        href="/trigger-crt"
        className={`${tab ? "py-1 px-3 bg-white rounded-md" : ""}`}
      >
        Image creator
      </Link> */
}
