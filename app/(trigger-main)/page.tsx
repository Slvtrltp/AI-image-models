"use client";

import { useEffect, useState } from "react";
import { Chat } from "../components/Chat";
import { Generator } from "../components/Generator";
import { Header } from "../components/Header";
import { Summary } from "../components/Summary";
import { TabId, Tabs } from "../components/Tabs";

const TABS: {
  id: TabId;
  title: string;
  subtitle: string;
  summaryTitle: string;
  initialMsg: string;
  placeholder?: string;
}[] = [
  {
    id: "analysis",
    title: "Image analysis",
    subtitle: "Upload a food photo, and AI will detect the ingredients.",
    summaryTitle: "Here is the summary",
    initialMsg: "First, enter your image to recognize the ingredients.",
  },
  {
    id: "ingredient",
    title: "Ingredient recognition",
    subtitle: "Describe the food, and AI will detect the ingredients.",
    summaryTitle: "Identified Ingredients",
    initialMsg: "First, enter a food description to recognize the ingredients.",
    placeholder: "Describe a dish and the ingredients used to make it...",
  },
  {
    id: "creator",
    title: "Food image creator",
    subtitle: "What food image do you want? Describe it briefly.",
    summaryTitle: "Result",
    initialMsg: "First, enter a prompt to generate an image.",
    placeholder: "A plate of spaghetti carbonara in a cozy Italian restaurant...",
  },
];

const SparkleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M3 1V5M17 15V19M1 3H5M15 17H19M10 1L8.088 6.813C7.99015 7.11051 7.82379 7.38088 7.60234 7.60234C7.38088 7.82379 7.11051 7.99015 6.813 8.088L1 10L6.813 11.912C7.11051 12.0099 7.38088 12.1762 7.60234 12.3977C7.82379 12.6191 7.99015 12.8895 8.088 13.187L10 19L11.912 13.187C12.0099 12.8895 12.1762 12.6191 12.3977 12.3977C12.6191 12.1762 12.8895 12.0099 13.187 11.912L19 10L13.187 8.088C12.8895 7.99015 12.6191 7.82379 12.3977 7.60234C12.1762 7.38088 12.0099 7.11051 11.912 6.813L10 1Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SummaryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M14 2V8H20M16 13H8M16 17H8M10 9H8M14.5 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V7.5L14.5 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("analysis");
  const [analysisImage, setAnalysisImage] = useState<File | null>(null);
  const [analysisPreview, setAnalysisPreview] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const [ingredientText, setIngredientText] = useState("");
  const [ingredientResult, setIngredientResult] = useState("");
  const [creatorPrompt, setCreatorPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [error, setError] = useState("");
  const [loadingTab, setLoadingTab] = useState<TabId | null>(null);

  useEffect(() => {
    return () => {
      if (analysisPreview) URL.revokeObjectURL(analysisPreview);
    };
  }, [analysisPreview]);

  useEffect(() => {
    return () => {
      if (generatedImage) URL.revokeObjectURL(generatedImage);
    };
  }, [generatedImage]);

  const current = TABS.find((tab) => tab.id === activeTab)!;
  const isLoading = loadingTab === activeTab;

  const selectAnalysisImage = (file: File | null) => {
    setAnalysisImage(file);
    setAnalysisPreview(file ? URL.createObjectURL(file) : "");
    setAnalysisResult("");
    setError("");
  };

  const resetCurrentTab = () => {
    setError("");

    if (activeTab === "analysis") {
      setAnalysisImage(null);
      setAnalysisPreview("");
      setAnalysisResult("");
    } else if (activeTab === "ingredient") {
      setIngredientText("");
      setIngredientResult("");
    } else {
      setCreatorPrompt("");
      setGeneratedImage("");
    }
  };

  const runTextRequest = async (
    tab: TabId,
    url: string,
    body: BodyInit,
    setResult: (result: string) => void,
    isJson = false,
  ) => {
    setLoadingTab(tab);
    setError("");

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: isJson ? { "Content-Type": "application/json" } : undefined,
        body,
      });
      const data = (await response.json()) as { result?: string; error?: string };

      if (!response.ok) throw new Error(data.error || "Request failed");
      setResult(data.result || "No result was generated.");
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : "Request failed",
      );
    } finally {
      setLoadingTab(null);
    }
  };

  const analyzeImage = async () => {
    if (!analysisImage) return;
    const formData = new FormData();
    formData.append("image", analysisImage);
    await runTextRequest("analysis", "/api/caption", formData, setAnalysisResult);
  };

  const extractIngredients = async () => {
    await runTextRequest(
      "ingredient",
      "/api/extract",
      JSON.stringify({ description: ingredientText.trim() }),
      setIngredientResult,
      true,
    );
  };

  const generateImage = async () => {
    if (!creatorPrompt.trim()) return;
    setLoadingTab("creator");
    setError("");

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: creatorPrompt.trim() }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error || "Failed to generate the image");
      }

      setGeneratedImage(URL.createObjectURL(await response.blob()));
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Failed to generate the image",
      );
    } finally {
      setLoadingTab(null);
    }
  };

  const resultText =
    error ||
    (activeTab === "analysis"
      ? analysisResult
      : activeTab === "ingredient"
        ? ingredientResult
        : "");

  const hasResult = Boolean(
    resultText || (activeTab === "creator" && generatedImage),
  );
  const textValue =
    activeTab === "ingredient"
      ? ingredientText
      : activeTab === "creator"
        ? creatorPrompt
        : undefined;
  const isGenerateDisabled =
    activeTab === "analysis"
      ? !analysisImage
      : activeTab === "ingredient"
        ? !ingredientText.trim()
        : !creatorPrompt.trim();

  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto w-full max-w-[640px] px-4 py-6 sm:px-8">
        <div className="space-y-6">
          <Tabs
            activeTab={activeTab}
            onChange={(tab) => {
              setActiveTab(tab);
              setError("");
            }}
          />

          <Generator
            img={<SparkleIcon />}
            label={current.title}
            reload
            isActive
            desc={current.subtitle}
            input={activeTab === "analysis"}
            placeholder={current.placeholder}
            file={activeTab === "analysis" ? analysisImage : null}
            previewUrl={activeTab === "analysis" ? analysisPreview : undefined}
            onFileChange={
              activeTab === "analysis" ? selectAnalysisImage : undefined
            }
            onRemoveFile={activeTab === "analysis" ? resetCurrentTab : undefined}
            textValue={textValue}
            onTextChange={
              activeTab === "ingredient"
                ? setIngredientText
                : activeTab === "creator"
                  ? setCreatorPrompt
                  : undefined
            }
            onGenerate={
              activeTab === "analysis"
                ? analyzeImage
                : activeTab === "ingredient"
                  ? extractIngredients
                  : generateImage
            }
            onReset={resetCurrentTab}
            isLoading={isLoading}
            loadingText={
              activeTab === "analysis"
                ? "Analyzing..."
                : activeTab === "ingredient"
                  ? "Extracting..."
                  : "Generating..."
            }
            disabled={isGenerateDisabled}
          />

          <Summary
            img={<SummaryIcon />}
            label={current.summaryTitle}
            desc={resultText || current.initialMsg}
            boxed={hasResult}
            imageUrl={
              activeTab === "creator" && !error ? generatedImage : undefined
            }
            imageAlt={creatorPrompt || "Generated food"}
          />
        </div>
      </main>

      <Chat />
    </div>
  );
}
