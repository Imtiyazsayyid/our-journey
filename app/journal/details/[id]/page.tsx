"use client";

import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import UserCard from "@/components/UserCard";
import { users } from "@/constants/users";
import { getSingleJournalEntry } from "@/lib/actions/journal.actions";
import useAppwrite from "@/lib/useAppwrite";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

const DetailsPage = ({ params }: Props) => {
  const { data, isLoading } = useAppwrite(() => getSingleJournalEntry(params.id));
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  const getFormattedContent = (text: string) => {
    const newContent = text.replace(/\n/g, "<br>");
    return newContent;
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen py-20">
      <div className="h-full w-[1000px] p-10">
        <div className="min-h-96">
          <img src={data?.imageURL || ""} className="rounded-lg mb-10 bg-cover h-[50vh] w-full object-cover" />
        </div>

        <div className="flex justify-center mb-5">
          <UserCard user={users.find((u) => u.username === data?.username) || undefined} />
        </div>

        <h1 className="text-3xl md:text-5xl font-bold mb-7 flex items-center gap-3">{data?.title}</h1>
        <p className="text-md mb-5 text-gray-400">{moment(data?.date, "DD/MM/YYYY").format("DD, MMM YYYY")}</p>

        <p
          className="text-md md:text-xl mb-10"
          dangerouslySetInnerHTML={{
            __html: getFormattedContent(data?.content),
          }}
        />

        <div className="flex justify-center">
          <Button className="bg-fun-200 hover:opacity-90 font-semibold h-11 w-fit" onClick={() => router.back()}>
            <ChevronLeftIcon className="h-5 w-5" />
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
