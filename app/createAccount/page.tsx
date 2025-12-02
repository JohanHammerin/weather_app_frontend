"use client";

import { register } from "../service/authService";
import { useState } from "react";
import { Button } from "../_components/button/button.component";
import { Form } from "../_components/form/form.component";
import { useRouter } from "next/navigation";

export default function Page() {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    
    e.preventDefault();
    console.log({ username, email, password });

    await register({username, email, password });
    router.push("/login")
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
              <h1 className="text-2xl font-bold text-gray-800">Create account</h1>
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
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            
            <section className="flex gap-5">
              <Button title={"Create account"} type="submit" />
            </section>
          </Form>
        </section>
      </div>
    </>
  );
}
