"use client";

import Link from "next/link";
import { Button } from "./_components/button/button.component";
import { Form } from "./_components/form/form.component";

export default function Home() {
  return (
    <div className="bg-bakgrund flex justify-center items-center min-h-screen">
      <section className="flex justify-center items-center flex-col w-full max-w-md">
        <Form>
          <section className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">What would you like to do?</h1>
          </section>

          <section className="flex gap-5">
            <Link href="/login">
            <Button title={"Sign in"} type="submit" />
            </Link>
            
            <Link href="/createAccount">
              <Button title={"Create Account"} />
            </Link>
          </section>
        </Form>

        <span className="text-xl text-center text-gray-700 mt-6">
          Get your daily weather right into your digital inbox!
        </span>
      </section>
    </div>
  );
}
