"use client";

import { useState } from "react";
import { Button } from "../_components/button/button.component";
import { Form } from "../_components/form/form.component";
import { updateSubscription } from "../service/subscriptionService";

export default function Page() {
  const [city, setCity] = useState("");
  const [time, setTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      await updateSubscription({
        city,
        time,
      });

      setMessage("Subscription updated successfully!");
      setCity("");
      setTime("");
    } catch (err: any) {
      setMessage(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-bakgrund flex justify-center items-center min-h-screen">
      <section className="flex justify-center items-center flex-col w-full max-w-md">
        <Form
          onSubmit={handleSubmit}
          className="w-full bg-white p-8 rounded-lg shadow-md space-y-6"
        >
          <section className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Create subscription</h1>
          </section>

          <section>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter city"
              required
            />
          </section>

          <section>
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Time for notification
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
              title={isLoading ? "Updating..." : "Update subscription"}
              type="submit"
              disabled={isLoading}
            />
          </section>
        </Form>
      </section>
    </div>
  );
}
