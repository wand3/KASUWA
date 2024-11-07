import Jiki from "../components/Jiki";
import { InputField } from "../components/Auth/FormInput";
import { Button } from "@headlessui/react";
import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useFlash from "../hooks/UseFlash";
import UseApi from "../hooks/UseApi";
import useUser from "../hooks/UseUser";


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
  // const {login} = useUser();



  const emailField = useRef<HTMLInputElement>(null);
  const passwordField = useRef<HTMLInputElement>(null);

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

    console.log("data: ", email);
    console.log("data2: ", password);

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
      <Jiki nav>
        <form onSubmit={handleSubmit}>
          <InputField
            name="email"
            label="Email"
            type="email"
            placeholder="Enter email"
            error={formErrors.email}
            Fieldref={emailField}
          />
          <InputField
            name="password"
            label="Password"
            type="password"
            placeholder="Enter password"
            error={formErrors.password}
            Fieldref={passwordField}
          />
          {loginError && <p className="text-red-500">{loginError}</p>}
          <Button
            className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
            type="submit"
          >
            Login
          </Button>
          <hr />
          <p>
            Don&apos;t have an account?{" "}
            <a href="/RegisterPage">Register here</a>!
          </p>
        </form>
      </Jiki>
    </>
  );
};

export default LoginPage;