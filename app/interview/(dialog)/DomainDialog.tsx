"use client";
import React, { useState,useContext } from "react";
// import { SupbaseContext } from "@/app/context/SupbaseProvider";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SupbaseContext } from "@/app/context/SupbaseProvider";
import Check from "./Checkbox";
import { UserResponse,User } from "@supabase/supabase-js";

// import { DialogClose } from "@radix-ui/react-dialog";

const DomainDialog = () => {
//   function getUID() {
//     // Get the timestamp and convert 
//     // it into alphanumeric input
//     return new Date().getTime();
// }
  const [value, setValue] = useState<string>("");
  const [domainID,setDomainId] = useState();
  const [currentUser,setCurrentUser] = useState<User | null>(null);
  const supabase = useContext(SupbaseContext)
  const getUser = async() => {
    if(supabase != null){
      // const data = await supabase.auth.getSession()
      const data = await supabase.auth.getUser() 
      setCurrentUser(data?.data.user)
      console.log(data?.data.user)
    }
  }
  const generateQuestions = async () => {
    console.log("Domain selected " + value);
    try {
      const res = await fetch(`http://localhost:3000/api/cohereai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ domain: value ,user:currentUser}),
      });
      if (!res.ok) {
        throw new Error("API request failed");
      }
    const questions = await res.json();

    return questions

    } catch(error){
      console.log("Error fetching questions",error)
    }
  }

  const insertQuestions = async (questionText : string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/insert-questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ domainValue: value ,questions_text:questionText}),
      });
      if (!res.ok) {
        throw new Error("API request failed");
      }
    const response = await res.json();

    console.log(response)

    } catch(error){
      console.log("Error inserting questions",error)
    }
  }

  const handleQuestion = async(e: React.FormEvent) => {
    e.preventDefault()
    try{
      const getQuestions = await generateQuestions()
      const finalResponse = await insertQuestions(getQuestions)
      console.log(finalResponse)
    } catch(error){
      console.log('Error executing requests', error)
    }
  }

  // useEffect(() => {
  //   fetch("http://localhost:3000/api/cohereai", { method: "POST" })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data))
  //     .catch((err) => console.log(err));
  // }, [value]);

  return (
    <Dialog>
      {/* <Button type="button" className="mt-3 bg-green-200 dark:text-black text-xs font-bold" variant="outline"> */}
      <DialogTrigger className="mt-3 bg-green-200 rounded-sm dark:text-black text-xs font-bold p-2" onClick={getUser}>
        Select your Domain
      </DialogTrigger>
      {/* </Button> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Select Your Domain</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <Check value={value} setValue={setValue} />
        </DialogDescription>
        <DialogFooter className="sm:justify-start">
          <DialogClose onClick={handleQuestion}>
            <Button type="button" variant="secondary">
              Submit
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DomainDialog;
