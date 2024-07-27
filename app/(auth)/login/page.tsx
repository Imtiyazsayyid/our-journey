"use client";

import React, { useState } from "react";
import { Spotlight } from "@/components/ui/spotlight";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LockIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/GlobalProvider";
import { users } from "@/constants/users";

function LoginPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const { user } = useGlobalContext();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  if (user) {
    router.replace("/journal");
  }

  const submit = async () => {
    if (!form.username || !form.password) {
      console.log("Fill All Details");
    }

    setLoading(true);
    try {
      const currentUser = users.find((user) => user.username === form.username && user.password === form.password);

      if (currentUser) {
        localStorage.setItem("ourJourneyUser", JSON.stringify(currentUser));
        router.replace("/journal");
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-black flex justify-center items-center">
      {/* <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="green" /> */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#818cf8" />
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center pb-5 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Let&apos;s Journey Through
        </h1>
        <h1 className="text-4xl md:text-7xl font-bold text-center pb-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Our Memories.
        </h1>
        <div className="h-fit w-full flex justify-center px-10">
          <div className="h-full w-full md:w-1/2 rounded-2xl bg-dark-400 border-2 border-fun-200 shadow-md shadow-fun-200 p-10 space-y-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              <Input
                placeholder="Username"
                className="shad-input mb-4"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />

              <Input
                placeholder="●●●●●●●●●●"
                type="password"
                className="shad-input"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />

              <div className="flex justify-center w-full pt-10">
                <Button
                  disabled={isLoading}
                  className="border-white border-2 hover:bg-fun-200 hover:border-fun-200 font-semibold w-40"
                  type="submit"
                >
                  Unlock Memories <LockIcon className="min-h-4 min-w-4 ml-2" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
