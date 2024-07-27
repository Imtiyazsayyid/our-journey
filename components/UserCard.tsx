import { User } from "@/context/GlobalProvider";
import React from "react";

interface Props {
  user: User | undefined;
}

const UserCard = ({ user }: Props) => {
  if (!user) return;

  return (
    <div className="w-fit h-20 flex items-center gap-4 pr-8 pl-3 rounded-xl shadow-lg bg-dark-400 mb-5">
      <img src={user.avatar} alt="" className="w-12 h-12 rounded-full" />
      <div>
        <h5 className="text-lg font-bold">
          {user.firstName} {user.lastName}
        </h5>
        <p>@{user.username}</p>
      </div>
    </div>
  );
};

export default UserCard;
