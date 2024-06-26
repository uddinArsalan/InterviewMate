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
import { User } from "@supabase/supabase-js";
import "./styles/style.css"

const DomainDialog = () => {
  const [value, setValue] = useState<string>("");
  const [open, setOpen] = useState(false);

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
      setOpen(false); 
      return finalResponse
    } catch(error){
      console.log('Error executing requests', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button 
      variant="outline" 
      className="mt-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 shadow-sm hover:shadow"
      onClick={getUser}
    >
      Select your Domain
    </Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[600px] sm:max-h-[80vh] bg-white dark:bg-gray-800 overflow-hidden">
    <DialogHeader className="pb-4">
      <DialogTitle className="text-3xl font-bold text-gray-800 dark:text-gray-100">Select Your Domain</DialogTitle>
      <DialogDescription className="text-lg text-gray-600 dark:text-gray-300">
        Choose the domain that best fits your expertise and interests.
      </DialogDescription>
    </DialogHeader>
    <div className="py-6 max-h-[50vh] overflow-y-auto pr-4 mr-[-16px] hide-scrollbar">
      <Check value={value} setValue={setValue} />
    </div>
    <DialogFooter className="flex justify-end space-x-3">
      <DialogClose asChild>
        <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-100 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
          Cancel
        </Button>
      </DialogClose>
      <DialogClose asChild>
        <Button 
          type="button" 
          variant="default" 
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6"
          onClick={handleQuestion}
        >
          Submit
        </Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
  );
};

export default DomainDialog;
