export const Input = ({
  input,
  placeholder,
}: {
  input: boolean;
  placeholder?: string;
}) => {
  return (
    <div>
      {input ? (
        <div className="w-full rounded-md overflow-hidden border border-[#E4E4E7]">
          <input type="file" className="px-3 py-2" placeholder="Choose File" />
        </div>
      ) : (
        <div className="w-full rounded-md overflow-hidden border border-[#E4E4E7]">
          <textarea
            className="px-3 py-2 w-full box-border block resize-y outline-0"
            placeholder={placeholder}
          />
        </div>
      )}
    </div>
  );
};
