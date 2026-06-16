import { Header } from "../components/Header";
import { Tabs } from "../components/Tabs";

import { Generator } from "../components/Generator";
import { Summary } from "../components/Summary";

export default function Page() {
  return (
    <div>
      <Header />
      <div className="w-full container flex justify-center">
        <div className=" w-145 h-screen py-6 space-y-6">
          <Tabs />

          <Generator
            img={
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
            }
            label="Food image creator"
            reload={true}
            isActive={true}
            desc="What food image do you want? Describe it briefly."
            input={false}
            placeholder="Хоолны тайлбар"
          />
          <Summary
            img={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 15L17.914 11.914C17.5389 11.5391 17.0303 11.3284 16.5 11.3284C15.9697 11.3284 15.4611 11.5391 15.086 11.914L6 21M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3ZM11 9C11 10.1046 10.1046 11 9 11C7.89543 11 7 10.1046 7 9C7 7.89543 7.89543 7 9 7C10.1046 7 11 7.89543 11 9Z"
                  stroke="#09090B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            label="Result"
            desc="First, enter your text to generate an image."
          />
        </div>
      </div>
    </div>
  );
}
