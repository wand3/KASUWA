import Jiki from "../components/Jiki";
import { InputField } from "../components/Auth/FormInput";
import { Button } from "@headlessui/react";
import React, { useRef, useState } from "react";

type FormErrorType = {
    email?: string;
    password?: string;
    confirmPassword?: boolean;
}

const LoginPage = () => {
    const [ formerrors, setFormerrors ] = useState<FormErrorType>({});

    const emailField = useRef<HTMLInputElement>(null)
    const passwordField = useRef<HTMLInputElement>(null)

    const onSubmit = (ev: React.FormEvent) =>  {
        ev.preventDefault();
        const email = emailField.current ? emailField.current.value : '';
        const password = passwordField.current ? passwordField.current.value : '';

        console.log(`${email}, ${password}`)
        const errors: FormErrorType = {};
        if (!email) {
            errors.email = 'email must not be empty'
        }
        if (!password) {
            errors.password = 'password must not be empty'
        }
        setFormerrors(errors)


    }
    

    return (
        <>
            <Jiki nav>
                <form onSubmit={onSubmit}>
                    <InputField  
                        name='email'
                        label="Email"
                        type="email"
                        placeholder="Enter email"
                        error={formerrors.email}
                        Fieldref={emailField}
                    />

                    <InputField  
                        name='password'
                        label="Password"
                        type="password"
                        placeholder="Enter password"
                        error={formerrors.password}
                        Fieldref={passwordField}
                    />

                    <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                    type="submit">
                    Login
                    </Button>
                </form>     
            </Jiki>
            
        </>
    )
}

export default LoginPage;