"use client";
import { cn } from "@/utils/cn";
import { EditIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  username: string;
  imageUrl: string;
  userImageUrl: string;
  title: string;
  date: string;
}

function JourneyCard({ id, username, imageUrl, userImageUrl, title, date }: Props) {
  const router = useRouter();

  return (
    <div className="w-full group/card" onClick={() => router.push("/journal/details/" + id)}>
      <div
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
        className={cn(
          " cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl backgroundImage flex flex-col justify-between p-4",
          " bg-cover"
        )}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 bg-black opacity-30"></div>
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>

        <div
          className="absolute right-5 z-50 hover:text-fun-200"
          onClick={(e) => {
            e.stopPropagation();
            router.push("/journal/form?journal_id=" + id);
          }}
        >
          <EditIcon className="h-4 w-4" />
        </div>

        <div className="flex flex-row items-center space-x-4 z-10">
          <Image
            height="100"
            width="100"
            alt="Avatar"
            src={userImageUrl}
            className="h-10 w-10 rounded-full border-2 object-cover"
          />
          <div className="flex flex-col">
            <p className="font-normal text-base text-gray-50 relative z-10">{username}</p>
          </div>
        </div>
        <div className="text content">
          <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">{title}</h1>
          <p className="font-normal text-sm text-gray-50 relative z-10 my-4">{date}</p>
        </div>
      </div>
    </div>
  );
}

export default JourneyCard;
