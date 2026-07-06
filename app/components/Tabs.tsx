"use client";

export const Tabs = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => {
  const tabs = [
    { name: "Image analysis", key: "analysis" },
    { name: "Ingredient recognition", key: "ingredient" },
    { name: "Image creator", key: "creator" },
  ];

  return (
    <div className="p-1 bg-[#F4F4F5] flex rounded-md items-center">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`${isActive ? "py-1 px-3 bg-white rounded-md" : "py-1 px-3 text-[#71717A]"}`}
          >
            {tab.name}
          </button>
        );
      })}
    </div>
  );
};
