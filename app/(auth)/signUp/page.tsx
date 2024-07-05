import React from "react";
import Link from "next/link";
import GoogleAuth from "../GoogleAuth";
import Form from "./Form";
import GithubAuth from "../GithubAuth";

const SignUp = () => {
  return (
    <div className="flex flex-col gap-3 items-center h-screen lg:p-16 p-10">
      <div className="font-bold text-3xl mb-4 text-center">
        Sign Up for{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-bold">
          InterviewMate
        </span>
      </div>
      <div className="flex gap-6 justify-center items-center">
        <GoogleAuth />
        <GithubAuth />
      </div>
      <div>OR</div>
      <Form />
      <div className="text-sm">
        Already have an account?{" "}
        <Link href="/login">
          <span className="text-blue-500">Log in here</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
