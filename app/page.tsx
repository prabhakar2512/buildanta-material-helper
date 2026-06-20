"use client";

import { useState } from "react";
import { Building2 } from "lucide-react";

export default function Home() {
  const [material, setMaterial] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!material.trim()) {
      setResponse("Please enter a material name.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/material", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ material }),
      });

      const data = await res.json();

      if (data.error) {
        setResponse(data.error);
      } else {
        setResponse(data.result);
      }
    } catch {
      setResponse("Something went wrong.");
    }

    setLoading(false);
  };

 return (
  <main className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-6">
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">
      
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-2">
        Buildanta Material Helper
      </h1>

      <p className="text-center text-gray-600 mb-8">
        AI-powered construction material guidance for homeowners
      </p>

      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Enter material (cement, tiles, TMT bar...)"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg font-semibold cursor-pointer transition"
        >
          {loading ? "Generating..." : "Submit"}
        </button>
      </div>

      {response && (
        <div className="mt-8 bg-slate-50 border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">
            AI Recommendations
          </h2>

          <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
            {response}
          </div>
        </div>
      )}
    </div>
  </main>
);
}

