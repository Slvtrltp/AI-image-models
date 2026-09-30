"use client";

export type TabId = "analysis" | "ingredient" | "creator";

const tabs: { id: TabId; name: string }[] = [
  { id: "analysis", name: "Image analysis" },
  { id: "ingredient", name: "Ingredient recognition" },
  { id: "creator", name: "Image creator" },
];

export const Tabs = ({
  activeTab,
  onChange,
}: {
  activeTab: TabId;
  onChange: (id: TabId) => void;
}) => {
  return (
    <div className="grid grid-cols-3 items-center rounded-md bg-[#F4F4F5] p-1">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={
              isActive
                ? "rounded-md bg-black px-2 py-2 text-sm text-white sm:px-3 sm:py-1 sm:text-base"
                : "rounded-md px-2 py-2 text-sm text-[#71717A] sm:px-3 sm:py-1 sm:text-base"
            }
          >
            {tab.name}
          </button>
        );
      })}
    </div>
  );
};
