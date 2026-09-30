export const Input = ({
  input,
  placeholder,
  file,
  previewUrl,
  onFileChange,
  onRemoveFile,
  value,
  onValueChange,
}: {
  input: boolean;
  placeholder?: string;
  file?: File | null;
  previewUrl?: string;
  onFileChange?: (file: File | null) => void;
  onRemoveFile?: () => void;
  value?: string;
  onValueChange?: (value: string) => void;
}) => {
  return (
    <div>
      {input ? (
        file && previewUrl ? (
          <div className="relative h-40 w-60 overflow-hidden rounded-md border border-[#E4E4E7] bg-[#F4F4F5]">
            {/* A blob URL is required here because the image is selected locally. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="Selected food preview"
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={onRemoveFile}
              aria-label="Remove selected image"
              className="absolute right-2 bottom-2 flex h-8 w-8 items-center justify-center rounded-md bg-white text-lg shadow"
            >
              ×
            </button>
          </div>
        ) : (
          <div className="w-full overflow-hidden rounded-md border border-[#E4E4E7]">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
              className="w-full px-3 py-2"
              onChange={(event) =>
                onFileChange?.(event.target.files?.[0] ?? null)
              }
            />
          </div>
        )
      ) : (
        <div className="w-full rounded-md overflow-hidden border border-[#E4E4E7]">
          <textarea
            rows={5}
            value={value}
            onChange={(event) => onValueChange?.(event.target.value)}
            className="block w-full resize-y px-3 py-2 outline-0"
            placeholder={placeholder}
          />
        </div>
      )}
    </div>
  );
};
