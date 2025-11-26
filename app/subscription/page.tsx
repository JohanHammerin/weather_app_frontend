"use client";

import { useState } from "react";
import { Button } from "../_components/button/button.component";
import { Form } from "../_components/form/form.component";

export default function Page() {
  const [city, setCity] = useState("");
  const [time, setTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/subscription/ping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          city,
          time,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Abbonemang uppdaterat framgångsrikt!");
        setCity("");
        setTime("");
      } else {
        setMessage(data.error || "Något gick fel");
      }
    } catch (error) {
      setMessage("Nätverksfel, försök igen");
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-bakgrund flex justify-center items-center min-h-screen">
      <section className="flex justify-center items-center flex-col w-full max-w-md">
        <Form
          onSubmit={handleSubmit}
          className="w-full bg-white p-8 rounded-lg shadow-md space-y-6"
        >
          <section className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Skapa konto</h1>
          </section>

          <section>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Stad
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ange stad"
              required
            />
          </section>

          <section>
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Tid för notifikation
            </label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </section>

          {message && (
            <section
              className={`p-3 rounded-md text-center ${
                message.includes("framgångsrikt")
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message}
            </section>
          )}

          <section className="flex gap-5">
            <Button
              title={isLoading ? "Uppdaterar..." : "Uppdatera abbonemang"}
              type="submit"
              disabled={isLoading}
            />
          </section>
        </Form>
      </section>
    </div>
  );
}
