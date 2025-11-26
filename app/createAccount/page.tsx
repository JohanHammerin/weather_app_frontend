"use client";

import { useState } from "react";
import { Button } from "../_components/button/button.component";
import { Form } from "../_components/form/form.component";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ email, password });
    // Hantera inloggning här
  };
  return (
    <>
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
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                E-post
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="din@epost.se"
                required
              />
            </section>

            <section>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Lösenord
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ditt lösenord"
                required
              />
            </section>

            {/*Måste koppla till endpont för att skicka med credentielas till rätt endpoint*/}
            <section className="flex gap-5">
              <Button title={"Skapa konto"} type="submit" />
            </section>
          </Form>
        </section>
      </div>
    </>
  );
}
