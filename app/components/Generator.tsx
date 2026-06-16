import { ReactNode } from "react";
import { Label } from "./Label";
import { Updesc } from "./Updesc";
import { Input } from "./Input";

export const Generator = ({
  label,
  reload,
  isActive = true,
  img,
  desc,
  input,
  placeholder,
}: {
  label: string;
  reload?: boolean;
  isActive?: boolean;
  img: ReactNode;
  desc: string;
  input: boolean;
  placeholder?: string;
}) => {
  return (
    <div className="space-y-2">
      <Label img={img} label={label} reload={reload} isActive={isActive} />
      <Updesc desc={desc} />
      <Input input={input} placeholder={placeholder} />
      <div className="flex justify-end">
        <p className="px-4 py-2 bg-black rounded-md text-white">Generate</p>
      </div>
    </div>
  );
};
