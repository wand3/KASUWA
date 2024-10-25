<<<<<<< HEAD
import Jiki from "../components/Jiki";
import { InputField } from "../components/Auth/FormInput";
import { Button } from "@headlessui/react";
import React, { useRef, useState } from "react";
import UseApi from "../hooks/UseApi";
||||||| parent of 7801ba3 (test)
import Jiki from "../components/Jiki";
=======
// import Jiki from "../components/Jiki";
// import { InputField } from "../components/Auth/FormInput";
// import { Button } from "@headlessui/react";
// import React, { useRef, useState } from "react";
// import UseApi from "../hooks/UseApi";
>>>>>>> 7801ba3 (test)

// type FormErrorType = {
//     email?: string;
//     password?: string;
//     confirmPassword?: boolean;
// }

// const LoginPage = () => {
//     const [ formerrors, setFormerrors ] = useState<FormErrorType>({});
//     const api = UseApi();

//     const emailField = useRef<HTMLInputElement>(null)
//     const passwordField = useRef<HTMLInputElement>(null)

//     const onSubmit = async (ev: React.FormEvent) =>  {
//         ev.preventDefault();
//         const email = emailField.current ? emailField.current.value : '';
//         const password = passwordField.current ? passwordField.current.value : '';

//         console.log(`${email}, ${password}`)
//         const errors: FormErrorType = {};
//         if (!email) {
//             errors.email = 'email must not be empty'
//         }
//         if (!password) {
//             errors.password = 'password must not be empty'
//         }
//         setFormerrors(errors);
//         if (Object.keys(errors).length > 0){
//             return;
//         }

//         // const result = await api.post('/auth/signin')
//         // if (result === 'Login failed Wrong password' ) {
//         //     console.log('wrong password')
//         // }

//     }

//     return (
//         <>
//             <Jiki nav>
//                 <form onSubmit={onSubmit}>
//                     <InputField
//                         name='email'
//                         label="Email"
//                         type="email"
//                         placeholder="Enter email"
//                         error={formerrors.email}
//                         Fieldref={emailField}
//                     />

//                     <InputField
//                         name='password'
//                         label="Password"
//                         type="password"
//                         placeholder="Enter password"
//                         error={formerrors.password}
//                         Fieldref={passwordField}
//                     />

//                     <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
//                     type="submit">
//                     Login
//                     </Button>
//                     <hr />
//                     <p>Don&apos;t have an account? <a href="/RegisterPage">Register here</a>!</p>
//                 </form>
//             </Jiki>

//         </>
//     )
// }

// export default LoginPage;
//
//

import Jiki from "../components/Jiki";
import { InputField } from "../components/Auth/FormInput";
import { Button } from "@headlessui/react";
import React, { useRef, useState } from "react";
import UseApi from "../hooks/UseApi";

type FormErrorType = {
  email?: string;
  password?: string;
};

type FormErrorType = {
    email?: string;
    password?: string;
    confirmPassword?: boolean;
}

const LoginPage = () => {
<<<<<<< HEAD
    const [ formerrors, setFormerrors ] = useState<FormErrorType>({});
    const api = UseApi();

    const emailField = useRef<HTMLInputElement>(null)
    const passwordField = useRef<HTMLInputElement>(null)

    const onSubmit = async (ev: React.FormEvent) =>  {
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
        setFormerrors(errors);
        if (Object.keys(errors).length > 0){
            return;
        }

        // const result = await api.post('/auth/signin')
        // if (result === 'Login failed Wrong password' ) {
        //     console.log('wrong password')
        // }


    }
    
||||||| parent of 7801ba3 (test)
=======
  const [formErrors, setFormErrors] = useState<FormErrorType>({});
  const [loginError, setLoginError] = useState<string | null>(null); // State for login error message
  const api = UseApi();
>>>>>>> 7801ba3 (test)

<<<<<<< HEAD
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
                    <hr />
                    <p>Don&apos;t have an account? <a href="/RegisterPage">Register here</a>!</p>
                </form>     
            </Jiki>
            
        </>
    )
}
||||||| parent of 7801ba3 (test)
    return (
        <>
            <Jiki nav={false}>
            
                <p>Login page</p>
            </Jiki>
            
        </>
    )
}
=======
  const emailField = useRef<HTMLInputElement>(null);
  const passwordField = useRef<HTMLInputElement>(null);
>>>>>>> 7801ba3 (test)

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    console.log("working");
    const email = emailField.current ? emailField.current.value : "";
    const password = passwordField.current ? passwordField.current.value : "";

    console.log(`${email}, ${password}`);
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

    // Perform the login API call
    try {
      const response = await api.post(
        "http://127.0.0.1:5000/api/tokens",
        {},
        {
          headers: {
            Authorization: "Basic " + btoa(`${email}:${password}`),
          },
        },
      );

      if (response.token) {
        // Handle successful login, e.g., store the token
        localStorage.setItem("token", response.token); // Store token in local storage
        // Redirect or update UI as needed
        console.log("Login successful:", response.token);
      } else {
        setLoginError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Login failed. Please try again.");
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
          {loginError && <p className="text-red-500">{loginError}</p>}{" "}
          {/* Display login error */}
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
