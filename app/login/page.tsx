"use client";

import { login } from "../service/authService";
import { useState } from "react";
import { Button } from "../_components/button/button.component";
import { Form } from "../_components/form/form.component";
import { useRouter } from "next/navigation";

export default function Page() {

  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){

    setIsLoading(true)
    setMessage("")
    
    e.preventDefault();
    console.log({ username, password });

    try {
        await login({username, password});
        router.push("/subscription")
        setMessage("Signed in successfully!")
    } catch (err: any) {
        setMessage(err.message || "Something went wrong");
    } finally {
        setIsLoading(false);
    }

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
              <h1 className="text-2xl font-bold text-gray-800">Sign in</h1>
            </section>

            <section>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Username
              </label>
              <input
                type="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter username here"
                required
              />
            </section>

            <section>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password here"
                required
              />
            </section>

            {/*Måste koppla till endpont för att skicka med credentielas till rätt endpoint*/}
            <section className="flex justify-center gap-5">
              <Button title={isLoading ? "Signing in.." : "Sign in"} type="submit" disabled={isLoading}/>
            </section>
          </Form>
        </section>
      </div>
    </>
  );
}
