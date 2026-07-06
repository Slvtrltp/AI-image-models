"use client";

import { useState } from "react";
import { Header } from "./components/Header";
import { Tabs } from "./components/Tabs";
import { Generator } from "./components/Generator";
import { Summary } from "./components/Summary";

const sparkleIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 1V5M17 15V19M1 3H5M15 17H19M10 1L8.088 6.813C7.99015 7.11051 7.82379 7.38088 7.60234 7.60234C7.38088 7.82379 7.11051 7.99015 6.813 8.088L1 10L6.813 11.912C7.11051 12.0099 7.38088 12.1762 7.60234 12.3977C7.82379 12.6191 7.99015 12.8895 8.088 13.187L10 19L11.912 13.187C12.0099 12.8895 12.1762 12.6191 12.3977 12.3977C12.6191 12.1762 12.8895 12.0099 13.187 11.912L19 10L13.187 8.088C12.8895 7.99015 12.6191 7.82379 12.3977 7.60234C12.1762 7.38088 12.0099 7.11051 11.912 6.813L10 1Z"
      stroke="#09090B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const summaryIcon = (
  <svg
    width="18"
    height="22"
    viewBox="0 0 18 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 1V7H17M13 12H5M13 16H5M7 8H5M11.5 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H15C15.5304 21 16.0391 20.7893 16.4142 20.4142C16.7893 20.0391 17 19.5304 17 19V6.5L11.5 1Z"
      stroke="#09090B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const resultIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      ry="2"
      stroke="#09090B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="9"
      cy="9"
      r="2"
      stroke="#09090B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"
      stroke="#09090B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Home() {
  const [activeTab, setActiveTab] = useState("analysis");

  return (
    <div className="w-full">
      <Header />
      <div className="w-full container flex justify-center ">
        <div className="w-[580px] h-screen py-6 space-y-6">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {activeTab === "analysis" && (
            <>
              <Generator
                img={sparkleIcon}
                label="Image analysis"
                reload={true}
                isActive={true}
                desc="Upload a food photo, and AI will detect the ingredients."
                input={true}
              />
              <Summary
                img={summaryIcon}
                label="Here is the summary"
                desc="First, enter your image to recognize an ingredients."
              />
            </>
          )}

          {activeTab === "ingredient" && (
            <>
              <Generator
                img={sparkleIcon}
                label="Ingredient recognition"
                reload={true}
                isActive={true}
                desc="Describe the food, and AI will detect the ingredients."
                input={false}
                placeholder="Орц тодорхойлох"
              />
              <Summary
                img={summaryIcon}
                label="Identified Ingredients"
                desc="First, enter your text to recognize an ingredients."
              />
            </>
          )}

          {activeTab === "creator" && (
            <>
              <Generator
                img={sparkleIcon}
                label="Food image creator"
                reload={true}
                isActive={true}
                desc="What food image do you want? Describe it briefly."
                input={false}
                placeholder="Хоолны тайлбар"
              />
              <Summary
                img={resultIcon}
                label="Result"
                desc="First, enter your text to generate an image."
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
