import Jiki from "../components/Jiki";
import { InputField } from "../components/Auth/FormInput";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@headlessui/react";
import useFlash from "../hooks/UseFlash";

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
      let next = '/LoginPage';
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
        <form onSubmit={onSubmit}>
          <InputField
            name="email"
            label="Email"
            type="email"
            placeholder="Enter email"
            error={formerrors.email}
            Fieldref={emailField}
          />

          <InputField
            name="password"
            label="Password"
            type="password"
            placeholder="Enter password"
            error={formerrors.password}
            Fieldref={passwordField}
          />

          <InputField
            name="confirm"
            label="Confirm password"
            type="password"
            placeholder="Confirm password"
            error={formerrors.confirm}
            Fieldref={confirmField}
          />

          <Button
            className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
            type="submit"
          >
            Register
          </Button>
        </form>
      </Jiki>
    </>
  );
};

export default RegisterPage;
