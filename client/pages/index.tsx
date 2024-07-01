import { useRouter } from "next/router";
import { useCallback,useState } from "react";
import {useSession,signIn} from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';
import { FaGoogle } from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios";
import bcrypt from 'bcryptjs'


  const LoginPage = () => {
    // console.log(process.env.NODE_ENV);
  const router=useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [variant, setVariant] = useState('login');
  
  const login = useCallback(async (e) => {
    e.preventDefault()
    try {
      await signIn('credentials', {
        username,
        password,
        redirect: true,
        callbackUrl: '/ProfilePage'
      });


    } catch (error) {
      console.log(error);
    }
  }, [username, password, router]);

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
      }, []);



      const register = useCallback(async (e) => {
        e.preventDefault()

        try {
          await axios.post('/api/register', {
            username,
            email,
            password
          });
    
          login(e);
        } catch (error) {
            console.log(error);
        }
      }, [username, email, password, login]);

    return (
      <div className="relative min-h-screen h-full w-full bg-[url('/loginPage/login_bg.jpg')] bg-no-repeat bg-center bg-fixed bg-cover ">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md">
          
          <h2 className="flex justify-center text-3xl mb-8 items-center  font-semibold">
              {variant === 'login' ? 'Sign in' : 'Register'}
            </h2>
            
            {/* <p>{hash}</p> */}
          <form onSubmit={variant==='login'? login: register} >
          
            <div className="mb-4">

              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={username}
                onChange={(e: any) => setUsername(e.target.value)}
              />
            </div>

            {variant==='register' && 
            <div className="mb-4">

            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
          </div>
            }

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-center">
              <button
                onClick={variant === 'login' ? login : register}
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {variant === 'login'? 'login':'register'}
              </button>
            </div>
          </form>
          <div>
          <div className="mt-6 flex flex-row justify-between items-center">
          <button
            // onClick={() => signIn('github')}
            className="bg-gray-800 hover:bg-gray-900 text-white  py-2 px-2 rounded "
          >
            <FaGithub  />
            
          </button>
          <button
            // onClick={() => signIn('github')}
            className="bg-gray-800 hover:bg-gray-900 text-white  py-2 px-2 rounded "
          >
            <FaGoogle />
            
          </button>

        </div>
        <p className="text-neutral-500 mt-12">
              {variant === 'login' ? 'Not registered yet?' : 'Already have an account?'}
              <span onClick={toggleVariant} className=" ml-1 hover:underline cursor-pointer">
                {variant === 'login' ? 'Create an account' : 'Login'}
              </span>
              .
        </p>
          </div>
        </div>
      </div>
      </div>
    );
  };
  
  export default LoginPage;
  