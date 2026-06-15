import Link from "next/link";

export const Tabs = () => {
  return (
    <div className="p-1 bg-[#F4F4F5] flex rounded-md items-center">
      <Link href="/" className="py-1 px-3 bg-white rounded-md">
        Image analysis
      </Link>
      <Link href="/trigger-ing" className="text-[F4F4F5] py-1 px-3">
        Ingredient recognition
      </Link>
      <Link href="/trigger-crt" className="text-[F4F4F5] py-1 px-3">
        Image creator
      </Link>
    </div>
  );
};
