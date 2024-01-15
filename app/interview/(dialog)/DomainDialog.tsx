"use client";
import React, { useState,useContext } from "react";
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
// import { DialogClose } from "@radix-ui/react-dialog";

const DomainDialog = () => {
//   function getUID() {
//     // Get the timestamp and convert 
//     // it into alphanumeric input
//     return new Date().getTime();
// }
  const [value, setValue] = useState<string>("");
  const [domainID,setDomainId] = useState()
  const supabase = useContext(SupbaseContext)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Domain selected " + value);
    try {
      const res = await fetch(`http://localhost:3000/api/cohereai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ domain: value }),
      });
      if (!res.ok) {
        throw new Error("API request failed");
      }
      const questions = await res.json();
//       INSERT INTO questions (domain_id, question_text)
// VALUES
//     ((SELECT domain_id FROM domains WHERE domain_name = 'Domain1'), 'What is your question 1?'),
      if(supabase != null){
        const {data} = await supabase
          .from("domains")
          .select("domain_id")
          .eq('domain', value)
          if(data){
            const {domain_id} = data[0]
            setDomainId(domain_id)
          }
          console.log(domainID)
        const {error} = await supabase
          .from("questions")
          .insert({domain_id: domainID, question_text: questions})
          // .select();
        
          console.log(error)
      }
    } catch (error) {
      console.error(error);
    }
    // alert("Domain selected " + value);
  };

  // useEffect(() => {
  //   fetch("http://localhost:3000/api/cohereai", { method: "POST" })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data))
  //     .catch((err) => console.log(err));
  // }, [value]);

  return (
    <Dialog>
      {/* <Button type="button" className="mt-3 bg-green-200 dark:text-black text-xs font-bold" variant="outline"> */}
      <DialogTrigger className="mt-3 bg-green-200 rounded-sm dark:text-black text-xs font-bold p-2">
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
          <DialogClose onClick={(e) => handleSubmit(e)}>
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
