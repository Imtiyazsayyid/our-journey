"use client";

import MyDatePicker from "@/components/DatePicker";
import JourneyCard from "@/components/JourneyCard";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { users } from "@/constants/users";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getJournalEntries } from "@/lib/actions/journal.actions";
import useAppwrite from "@/lib/useAppwrite";
import { LogOutIcon, PlusIcon, SearchIcon } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Image from "next/image";

const JorunalPage = () => {
  const router = useRouter();
  const [filters, setFilters] = useState({
    search: "",
    date: null as Date | null,
  });

  const { user, setUser } = useGlobalContext();

  const {
    isLoading,
    data: journalEntries,
    refetch,
  } = useAppwrite(() => getJournalEntries({ ...filters, date: moment(filters.date).format("DD/MM/YYYY") }));

  const logout = () => {
    localStorage.removeItem("ourJourneyUser");
    setUser(null);
    router.replace("/login");
  };

  return (
    <div className="h-screen p-10 relative">
      <div className="absolute right-10 cursor-pointer">
        <div className="flex gap-2 items-center">
          <Image
            height="60"
            width="60"
            alt="Avatar"
            src={user?.avatar || ""}
            className="h-8 w-8 rounded-full border-2 object-cover"
          />

          <LogOutIcon className="text-rose-500 hover:opacity-75" onClick={logout} />
        </div>
      </div>
      <div className="py-10">
        <h1 className="text-7xl text-center font-bold">Our Journey</h1>
        <p className="text-lg font-semibold text-center mt-5">A Place That Holds All Our Memories Together</p>
      </div>
      <div>
        <div className="h-full w-full rounded-lg bg-dark-400 p-5 mb-3 flex flex-col md:flex-row gap-x-2 gap-y-5">
          <div className="w-full flex flex-col gap-2">
            <Label>Search</Label>
            <Input
              className="shad-input"
              placeholder="Find the day you're looking for..."
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>
          <div className="flex gap-2 items-end">
            <div className="w-full flex flex-col gap-2">
              <Label>Date</Label>
              <MyDatePicker
                containerClass="w-full md:w-96"
                value={filters.date}
                onChange={(date) => {
                  setFilters({ ...filters, date });
                }}
              />
            </div>
          </div>
          <div className="flex gap-2 items-end">
            <Button className="bg-fun-200 hover:opacity-90 font-semibold h-11 w-full" onClick={refetch}>
              <SearchIcon />
            </Button>

            <Button
              className="bg-fun-200 hover:opacity-90 font-semibold h-11 w-full"
              onClick={() => router.push("/journal/form")}
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="w-full h-20 flex justify-center pt-20">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pb-40">
          {journalEntries?.map((je: any) => (
            <JourneyCard
              key={je.$id}
              id={je.$id}
              title={je.title}
              date={moment(je.date, "DD/MM/YYYY").format("DD MMM, YYYY")}
              userImageUrl={users.find((user) => user.username === je.username)?.avatar || ""}
              imageUrl={je.imageURL}
              username={je.username}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default JorunalPage;
