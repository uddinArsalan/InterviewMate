"use client";
import React from "react";
import { useApp } from "../../context/AppProvider";
import Image from "next/image";
import { useSupabase } from "../../context/SupabaseProvider";
import { getUserQuestions } from "@/lib/db/";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const DropDown : React.FC<React.PropsWithChildren> = ({children} ) => {
  const {supabase} = useSupabase();
  async function logOut() {
    if (supabase) {
      const { error } = await supabase.auth.signOut();
      if(error){
        toast.error(error.message)
      }
    }
  }

  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <div onClick={logOut} className="cursor-pointer">{children}</div>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          Profile
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuItem>Support</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        Log out
        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

const ProfileIcon = () => {
  const { currentUser } = useApp();
  const user_metadata = currentUser?.user_metadata;
  const full_name: string = user_metadata?.full_name;
  const initials = full_name
    .split(" ")
    .map((name) => name.charAt(0))
    .join("");

    // console.log(currentUser?.aud);

  return (
    <DropDown >
    <div
      className="flex"
    >
      {user_metadata?.avatar_url ? (
        <div className="rounded-full">
          <Image
            src={currentUser?.user_metadata.avatar_url}
            alt="profile-pic"
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
      ) : (
        <div className="bg-gray-300 text-black font-bold w-16 h-16 rounded-full">
          {initials}
        </div>
      )}
      {/* {openDropdown && (
        <div
          className="p-8 flex justify-center items-center font-bold"
          onClick={signOut}
        >
          Log Out
        </div>
      )} */}
    </div>
    </DropDown>
  );
};

export default ProfileIcon;
