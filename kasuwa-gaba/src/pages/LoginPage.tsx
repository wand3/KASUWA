import Jiki from "../components/Jiki";
import { InputField } from "../components/Auth/FormInput";
import { Button } from "@headlessui/react";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import useFlash from "../hooks/UseFlash";
import UseApi from "../hooks/UseApi";
import useUser from "../hooks/UseUser";
import { UserSchema } from "../context/UserProvider";
import { ShoppingBag, StoreIcon } from "lucide-react";
import RegInputField from "../components/Auth/RegisterForm";


type FormErrorType = {
  email?: string;
  password?: string;
};

const LoginPage = () => {
  const [formErrors, setFormErrors] = useState<FormErrorType>({});
  const [loginError, setLoginError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const flash = useFlash();
  const api = UseApi();
  const {setUser, user, fetchUser} = useUser();
  

  const emailField = useRef<HTMLInputElement>(null);
  const passwordField = useRef<HTMLInputElement>(null);

  // const { data: currentCart, refetch } = useGetCartDetailsQuery();

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    console.log("data: ", emailField);
    console.log("data2: ", passwordField);
    const email = emailField.current ? emailField.current.value : "";
    const password = passwordField.current ? passwordField.current.value : "";

    // useEffect(() => {
    //   if (emailField.current) {
    //     emailField.current.focus();
    //   }
    // }, []);

    // console.log("data: ", email);
    // console.log("data2: ", password);

    const errors: FormErrorType = {};
    if (!email) {
      errors.email = "Email must not be empty";
    }
    if (!password) {
      errors.password = "Password must not be empty";
    }
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    // const result = await login(email, password);
    // console.log(result)
    // if (result === 'fail') {
    //   flash('Invalid username or password', 'danger');
    // }
    // else if (result === 'ok') {
    //   let next = '/';
    //   if (location.state && location.state.next) {
    //     next = location.state.next;
    //   }
    //   flash('login success', 'success')
    //   navigate(next);
    // }

    // const result = await api.login(email, password)
    // console.log(`login ${result}`)
    // if (result === 'fail') {
    //   flash('Invalid username or password', 'danger');
    // }
    // else if (result === 'ok') {
    //   let next = '/';
    //   if (location.state && location.state.next) {
    //     next = location.state.next;
    //   }
    //   navigate(next);

    // }
    const update_user = async () => {
      // useEffect(() => {
        fetchUser()
        setUser(user)
      // }, [user])  
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/tokens", {
        method: "POST",
        headers: {
          Authorization: "Basic " + btoa(`${email}:${password}`),
        },
      });
      console.log(response)
      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          localStorage.setItem("token", data.token);
          console.log("Login successful:", data.token);

          let next = '/';
            if (location.state && location.state.next) {
                next = location.state.next;
            } 
            flash('login success', 'success')
            navigate(next);


            
        } else {
          flash('check credentials', 'danger')
          setLoginError("Login failed. Please check your credentials.");

        }
      } else {

        setLoginError("Login failed. Please try again.");
        flash('check credentials', 'error')

        

      }
     } catch (error) {
      console.error("Login error:", error);
      flash('check credentials', 'danger')

      setLoginError("Login failed. Please try again.");
    }
  };

  return (
    <>
      <Jiki nav={false}>
        <section className="bg-white">
          <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
            <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
              <img
                alt="login-banner"
                src="/pexels-gabby-k-9430875.jpg"
                className="absolute inset-0 h-full w-full object-cover opacity-80"
              />
              <div className="hidden lg:relative lg:block lg:p-12">

                <a className="block text-[#ba2a25] p-2" href="/">
                  <span className="sr-only">Home</span>
                  <StoreIcon className="h-[4rem] w-fit"/>

                </a>

                <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                  Welcome to KASUWA <span className="inline-flex"><ShoppingBag /></span>
                </h2>
              </div>
            </section>

            <main
              className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
            >
              <div className="max-w-xl lg:max-w-3xl shadow-lg pb-5 px-3 rounded-md">
                <div className="relative -mt-16 block lg:hidden">
                  <a
                    className="inline-flex size-16 text-[#ba2a25] p-2 items-center justify-center rounded-full bg-white sm:size-20"
                    href="/"
                  >
                    <span className="sr-only">Home</span>
                    <StoreIcon className="h-[4rem] w-fit"/>

                  </a>

                  <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                    Welcome to KASUWA<span className="inline-flex absolute mt-1 ml-1"><ShoppingBag /></span>
                  </h1>

                  <p className="mt-4 leading-relaxed text-gray-500">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
                    quibusdam aperiam voluptatum.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
                  <div className="col-span-6">
                    
                     <RegInputField
                      name="email"
                      label="Email"
                      type="email"
                      placeholder="Enter email"
                      error={formErrors.email}
                      Fieldref={emailField}
                    />

                    <RegInputField
                      name="password"
                      label="Password"
                      type="password"
                      placeholder="Enter password"
                      error={formErrors.password}
                      Fieldref={passwordField}
                    />
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="SignInAccept" className="flex gap-4">
                      <input
                        type="checkbox"
                        id="SignInAccept"
                        name="signed_in_accept"
                        className="size-4 rounded-md border-gray-200 bg-white shadow-sm"
                      />

                      <span className="text-sm text-gray-700">
                        Keep account Signed in
                      </span>
                    </label>
                  </div>

                  

                  <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                      <Button
                        className="inline-block shrink-0 rounded-md border border-slate-900 bg-slate-800 hover:bg-transparent py-3 px-12 text-sm font-semibold text-white transition shadow-slate-600 focus:outline-1 hover:text-slate-900 data-[focus]:outline-2"
                        type="submit"
                      >
                        Sign in

                      </Button>

                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                      Don't have an account?
                      <a href="/register" className="text-gray-700 underline"> Sign up!</a>.
                    </p>
                  </div>
                </form>
              </div>
            </main>

          </div>
        </section>


        
          {loginError && <p className="text-red-500">{loginError}</p>}
          
      </Jiki>
    </>
  );
};

export default LoginPage;