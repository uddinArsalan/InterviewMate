"use client";
import React, { useState } from "react";
import { useSupbase } from "@/app/context/SupbaseProvider";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface formType {
  email: string;
  password: string;
}

const LoginForm = () => {
  const supabase = useSupbase();
  const [formData, setFormData] = useState<formType>({
    email: "",
    password: "",
  });

  const router = useRouter();

  const logIn = async (e: any) => {
    console.log("Inside login");
    e.preventDefault();
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast.error(error.message);
        router.push("/signup");
      } else {
        toast.success("Login Successfully");
      }
    }
  };
  return (
    <form action="" className="flex gap-4 lg:w-1/3 flex-col items-center">
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={(e) =>
          setFormData((prevData) => ({ ...prevData, email: e.target.value }))
        }
        placeholder="Email address"
        className="p-2 shadow-md border-[1px] rounded-md w-full"
      />
      <input
        type="password"
        name="passsword"
        value={formData.password}
        onChange={(e) =>
          setFormData((prevData) => ({ ...prevData, password: e.target.value }))
        }
        placeholder="Password"
        className="p-2 shadow-md border-[1px] rounded-md w-full"
      />

      {/* <div className="text-xs font-light mt-2">
        By clicking Create account below, you agree to our Terms of Service and
        Privacy Policy.
      </div> */}
      <button
        className="bg-gradient-to-r from-purple-700 to-pink-700 p-2 rounded-full w-1/3 flex justify-center items-center text-white"
        onClick={(e) => logIn(e)}
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
