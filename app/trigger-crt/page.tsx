import Image from "next/image";
import { Header } from "../components/Header";
import { Tabs } from "../components/Tabs";
import { Label } from "../components/Label";
import { Updesc } from "../components/Updesc";
import { Generator } from "./Generator";
import { Summary } from "./Summary";

export default function Page() {
  return (
    <div>
      <Header />
      <div className="w-full container flex justify-center">
        <div className=" w-[580px] h-screen py-6 space-y-6">
          <Tabs />

          <Generator />
          <Summary />
        </div>
      </div>
    </div>
  );
}
