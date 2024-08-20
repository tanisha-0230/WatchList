import React, { useState } from 'react';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../utils/helper';
import axiosInstance from '../utils/axiosInstance';
import PasswordInput from '../components/Inputs/PasswordInput';
import logoImg from '../assets/logo-img.png';
import logo from '../assets/w-logo.png';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter a password.");
      return;
    }

    setError("");

    // SignUp API Call
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <Header />

      <div className="flex items-center justify-center px-4">
        <div className="flex flex-col md:flex-row border rounded-xl bg-sky-950 max-w-md md:max-w-3xl w-full">
          <div className="md:w-1/2 md:bg-white rounded-3xl m-3 md:m-5 md:p-5 order-first md:order-last">
            {/* Logo for small screens */}
            <div className='flex flex-col items-center md:hidden text-center w-4/5 mx-auto border-b-[1px] border-white p-2'>
              <h3 className='text-white text-xl font-medium'>Track your favorites with</h3>
              <img 
                src={logo} 
                alt="Logo" 
                className="w-10" 
              />
              <h1 className="text-primary text-3xl font-bold">WatchList</h1>
            </div>

            {/* Img for larger screens */}
            <img 
              src={logoImg} 
              alt="App Image" 
              className="hidden md:block mx-auto w-auto" 
            />
            <h4 className="hidden md:block text-center text-xs md:text-sm text-white md:text-black">
              Manage your watchlist in style—see what's on, what's next, and what's done!
            </h4>
          </div>
          <form
            className="flex flex-col justify-center px-3 pb-3 md:p-5 w-full md:w-1/2"
            onSubmit={handleSignUp}
          >
            <h4 className="text-2xl mb-4 md:mb-7 text-center text-white md:text-left">Sign Up</h4>

            <input
              type="text"
              placeholder="Name"
              className="input-box mb-2 md:mb-4 text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              className="input-box mb-2 md:mb-4 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-2 md:mb-4"
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary w-full mb-4">
              Create Account
            </button>

            <p className="text-sm text-center text-white">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
