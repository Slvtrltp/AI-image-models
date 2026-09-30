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
  file,
  previewUrl,
  onFileChange,
  onRemoveFile,
  onGenerate,
  onReset,
  isLoading = false,
  loadingText = "Generating...",
  textValue,
  onTextChange,
  disabled = false,
}: {
  label: string;
  reload?: boolean;
  isActive?: boolean;
  img: ReactNode;
  desc: string;
  input: boolean;
  placeholder?: string;
  file?: File | null;
  previewUrl?: string;
  onFileChange?: (file: File | null) => void;
  onRemoveFile?: () => void;
  onGenerate?: () => void;
  onReset?: () => void;
  isLoading?: boolean;
  loadingText?: string;
  textValue?: string;
  onTextChange?: (value: string) => void;
  disabled?: boolean;
}) => {
  return (
    <div className="space-y-2">
      <Label
        img={img}
        label={label}
        reload={reload}
        isActive={isActive}
        onReload={onReset}
      />
      <Updesc desc={desc} />
      <Input
        input={input}
        placeholder={placeholder}
        file={file}
        previewUrl={previewUrl}
        onFileChange={onFileChange}
        onRemoveFile={onRemoveFile}
        value={textValue}
        onValueChange={onTextChange}
      />
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onGenerate}
          disabled={isLoading || disabled}
          className="rounded-md bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isLoading ? loadingText : "Generate"}
        </button>
      </div>
    </div>
  );
};
