import React from 'react'
import Link from 'next/link'
import GoogleAuth from "../GoogleAuth"
import GithubAuth from '../GithubAuth';
import LoginForm from './LoginForm';

const LogIn = () => {
    return (
        <div className='flex flex-col gap-3 items-center h-screen lg:p-16 p-10'>
            <div className='text-5xl font-extrabold mb-7 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 text-center'>WELCOME BACK!</div>
            <div className='text-xl font-bold'>LOGIN</div>
            <div className='flex gap-6 justify-center items-center'>
                <GoogleAuth />
                <GithubAuth />
            </div>
            <div>OR</div>
            <LoginForm />
            <div className='text-sm'>New here <Link href="/signUp"><span className='text-blue-500 hover:underline'>Sign Up here</span></Link></div>
        </div>
    )
}

export default LogIn