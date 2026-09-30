import { ReactNode } from "react";
import { Label } from "../components/Label";
import { Updesc } from "../components/Updesc";

export const Summary = ({
  img,
  label,
  isActive,
  desc,
  boxed = false,
  imageUrl,
  imageAlt = "Generated food",
}: {
  img: ReactNode;
  label: string;
  isActive?: boolean;
  desc: string;
  boxed?: boolean;
  imageUrl?: string;
  imageAlt?: string;
}) => {
  return (
    <div className="space-y-2">
      <Label img={img} label={label} isActive={isActive} />
      {imageUrl ? (
        <div className="rounded-md border border-[#E4E4E7] p-3">
          {/* Generated images are returned as local blob URLs. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={imageAlt}
            className="max-h-[520px] w-full rounded-md object-contain"
          />
        </div>
      ) : boxed ? (
        <div className="whitespace-pre-wrap rounded-md border border-[#E4E4E7] p-4 leading-7 text-[#27272A]">
          {desc}
        </div>
      ) : (
        <Updesc desc={desc} />
      )}
    </div>
  );
};
