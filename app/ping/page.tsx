"use client";

import { useState, useEffect } from "react";

interface Props {
  params: {
    id: string;
  };
}

export default function Page({ params }: Props) {
  const { id } = params;
  const [status, setStatus] = useState("Testing...");
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const backendUrl = "https://weather-app-subscription.onrender.com";

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    setIsLoading(true);
    setStatus("Testing...");

    try {
      console.log("Testing connection to:", backendUrl);

      // Test 1: Ping endpoint
      const pingResponse = await fetch(`${backendUrl}/ping`);
      const pingData = await pingResponse.json();
      console.log("Ping response:", pingData);

      // Test 2: Health endpoint (om den finns)
      let healthData = null;
      try {
        const healthResponse = await fetch(`${backendUrl}/health`);
        healthData = await healthResponse.json();
        console.log("Health response:", healthData);
      } catch (healthError) {
        console.log("Health endpoint not available");
      }
    } catch (error: any) {
      console.error("Connection failed:", error);
      setStatus("❌ Connection failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-bakgrund min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          API Connection Test - {id}
        </h1>

        <div className="mb-6">
          <p className="text-lg">
            <strong>Backend URL:</strong> {backendUrl}
          </p>
          <p className="text-lg">
            <strong>Status:</strong>
            <span
              className={`ml-2 ${
                status.includes("✅")
                  ? "text-green-600"
                  : status.includes("❌")
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}
            >
              {status}
            </span>
          </p>
        </div>

        {data && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Response Data:
            </h2>
            <div className="bg-gray-100 p-4 rounded-lg overflow-auto">
              <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
            </div>
          </div>
        )}

        <button
          onClick={testConnection}
          disabled={isLoading}
          className={`mt-6 px-6 py-3 rounded-lg font-semibold ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-button-blue hover:bg-blue-600 text-white"
          }`}
        >
          {isLoading ? "Testing..." : "Test Connection Again"}
        </button>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-bold text-lg mb-2">Testade endpoints:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <code>{backendUrl}/ping</code>
            </li>
            <li>
              <code>{backendUrl}/health</code>
            </li>
            <li>
              <code>{backendUrl}/api/subscriptions/create</code> (POST)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
