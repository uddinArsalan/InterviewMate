"use client";

import React, { useState ,useContext} from "react";
import { SupbaseContext } from "@/app/context/SupbaseProvider";

interface formType {
  name : string,
  email: string;
  password: string;
  confirmPassword : string
}

const Form = () => {
  const [formData, setFormData] = useState<formType>({
    name : "",
    email: "",
    password: "",
    confirmPassword : ""
  });
  const supabase = useContext(SupbaseContext);
  async function signUpNewUser(e : any) {
    e.preventDefault()
    if(supabase){
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
      console.log(data);
    }
  }
  return (
    <form action="" className="flex gap-4 lg:w-1/3 flex-col items-center">
      <input
        type="name"
        name="name"
        value={formData.name}
        onChange={(e) => setFormData((prevData) => ({...prevData,name : e.target.value}))}
        placeholder="Enter your name"
        className="p-2 shadow-md border-[1px] rounded-md w-full"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={(e) => setFormData((prevData) => ({...prevData,email : e.target.value}))}
        placeholder="Email address"
        className="p-2 shadow-md border-[1px] rounded-md w-full"
      />
      <input
        type="password"
        name="passsword"
        value={formData.password}
        onChange={(e) => setFormData((prevData) => ({...prevData,password : e.target.value}))}
        placeholder="Password"
        className="p-2 shadow-md border-[1px] rounded-md w-full"
      />
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={(e) => setFormData((prevData) => ({...prevData,confirmPassword : e.target.value}))}
        placeholder="Confirm password"
        className="p-2 shadow-md border-[1px] rounded-md w-full"
      />
      <div className="text-xs font-light mt-2">
        By clicking Create account below, you agree to our Terms of Service and
        Privacy Policy.
      </div>
      <button className="bg-gradient-to-r from-purple-800 to-pink-700 p-2 rounded-full w-1/2 flex justify-center items-center text-white" onClick={(e) => signUpNewUser(e)}>
        Create account
      </button>
    </form>
  );
};

export default Form;
// ahdhahdh