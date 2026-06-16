import { ReactNode } from "react";
import { Label } from "../components/Label";
import { Updesc } from "../components/Updesc";

export const Summary = ({
  img,
  label,
  isActive,
  desc,
}: {
  img: ReactNode;
  label: string;
  isActive?: boolean;
  desc: string;
}) => {
  return (
    <div className="space-y-2">
      <Label img={img} label={label} isActive={isActive} />
      <Updesc desc={desc} />
    </div>
  );
};
