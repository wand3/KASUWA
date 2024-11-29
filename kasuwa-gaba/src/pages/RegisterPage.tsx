import Jiki from "../components/Jiki";
import { RegInputField } from "../components/Auth/RegisterForm";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@headlessui/react";
import useFlash from "../hooks/UseFlash";
import { ShoppingBag, StoreIcon } from "lucide-react";

type FormErrorType = {
  email?: string;
  password?: string;
  confirm?: string;
};

const RegisterPage = () => {
  const [formerrors, setFormerrors] = useState<FormErrorType>({});

  const emailField = useRef<HTMLInputElement>(null);
  const passwordField = useRef<HTMLInputElement>(null);
  const confirmField = useRef<HTMLInputElement>(null);

  const flash = useFlash();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (emailField.current) {
      emailField.current.focus();
    }
  }, []);

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const email = emailField.current ? emailField.current.value : "";
    const password = passwordField.current ? passwordField.current.value : "";
    const confirm = confirmField.current ? confirmField.current.value : "";

    const errors: FormErrorType = {};
    if (!email) {
      errors.email = "email must not be empty";
    }
    if (!password) {
      errors.password = "password must not be empty";
    }
    if (!confirm) {
      errors.confirm = "confirm must not be empty";
    }

    setFormerrors(errors);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        flash('Registeration failed', 'error')
        throw new Error(errorData.message || "Failed to create user");
      }

      const data = await response.json();
      let next = '/login';
      if (location.state && location.state.next) {
          next = location.state.next;
      }
      flash('Registeration successful', 'success')
      navigate(next);
      console.log("data:", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Jiki nav>
        <section className="bg-white">
          <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
            <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
              <img src="../../public/pexels-gabby-k-9430875.jpg" className="absolute inset-0 h-full w-full object-cover"/>
            </aside>

            <main
              className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
            >
              <div className="max-w-xl lg:max-w-3xl">
                <a className="block text-[#ba2a25]" href="/">
                  <span className="sr-only">Home</span>
                  <StoreIcon className="h-[4rem] w-fit"/>
                </a>

                <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Welcome to Ksuwa <span className="inline-flex"><ShoppingBag /></span>
                </h1>

                <form onSubmit={onSubmit} className="mt-8 grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                     <RegInputField
                      name="email"
                      label="Email"
                      type="email"
                      placeholder="Enter email"
                      error={formerrors.email}
                      Fieldref={emailField}
                    />

                    <RegInputField
                      name="password"
                      label="Password"
                      type="password"
                      placeholder="Enter password"
                      error={formerrors.password}
                      Fieldref={passwordField}
                    />

                    <RegInputField
                      name="confirm"
                      label="Confirm password"
                      type="password"
                      placeholder="Confirm password"
                      error={formerrors.confirm}
                      Fieldref={confirmField}
                    />

                    <div className="col-span-6">
                      <label htmlFor="MarketingAccept" className="flex gap-4">
                        <input
                          type="checkbox"
                          id="MarketingAccept"
                          name="marketing_accept"
                          className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                        />

                        <span className="text-sm text-gray-700">
                          I want to receive emails about events, product updates and company announcements.
                        </span>
                      </label>
                    </div>

                    <div className="col-span-6">
                      <p className="text-sm text-gray-500">
                        By creating an account, you agree to our
                        <a href="#" className="text-gray-700 underline"> terms and conditions </a>
                        and
                        <a href="#" className="text-gray-700 underline">privacy policy</a>.
                      </p>
                    </div>

          
                    <div className="col-span-6 sm:flex py-4 sm:items-center sm:gap-4">

                      <Button
                        className="inline-block shrink-0 rounded-md border border-green-600 bg-gray-700 py-3 px-12 text-sm font-semibold text-white transition shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-transparent hover:text-slate-700 data-[focus]:outline-2"
                        type="submit"
                      >
                        Create an account

                      </Button>
                      
                    </div>
                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                        Already have an account?
                        <a href="/login" className="text-gray-700 underline">Log in</a>.
                      </p>
                  </div>
                </form>


              </div>
            </main>
          </div>
        </section>

        <form onSubmit={onSubmit}>
         
        </form>
      </Jiki>
    </>
  );
};

export default RegisterPage;