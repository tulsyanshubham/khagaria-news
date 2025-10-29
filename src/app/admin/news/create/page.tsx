"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import NewsForm, { NewsFormData } from "@/components/NewsForm";

export default function CreateNewsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreateSubmit = async (payload: NewsFormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("News created successfully!");
        router.push("/admin");
      } else {
        toast.error(data?.message || "Failed to create news.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <NewsForm
      onFormSubmit={handleCreateSubmit}
      isSubmitting={loading}
      pageTitle="Create News Article"
      pageDescription="Share your latest story with the world"
      submitButtonText="Publish News"
    />
  );
}