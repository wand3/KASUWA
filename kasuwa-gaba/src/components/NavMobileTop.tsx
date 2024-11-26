import { HeartIcon, ShoppingCartIcon, UserIcon } from "@heroicons/react/24/solid"
import { useState, useRef, useEffect } from "react"
import { useCart } from "../hooks/UseCart"
import useUser from "../hooks/UseUser";
import React from "react";
import { UserSchema } from "../context/UserProvider";
import { HandshakeIcon, Heart, InfoIcon, LayoutDashboardIcon, Lock, LogOutIcon, MenuIcon, SettingsIcon, UserCircleIcon, Waypoints } from "lucide-react";


// Profile Dropdown
const ProfileDropDown = (props) => {

    const [state, setState] = useState(false)
    const profileRef = useRef()
    const user = useUser();


    const navigation = [
        
        { title: "Log out", path: "/logout", icon: <LogOutIcon /> },
    ]

    
    // useEffect(() => {

    //     if (user) {
    //         const profile = profileRef.current ? user.user?.fullname : "";

    //         // profileRef.current == user.user?.fullname || "Guest";
    //     }
    //     const handleDropDown = (e) => {
    //         if (!profileRef.current.contains(e.target)) setState(false)
    //     }
    //     document.addEventListener('click', handleDropDown)
    // }, [user])

    return (
        <div className={` ${props.class}`}>
            { user.isAuthenticated && (

            <ul className={`bg-white absolute bottom-0 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${state ? '' : 'lg:hidden'}`}>
                {
                    navigation.map((item, idx) => (

                        <li>
                            <a key={idx} className=" text-gray-600 lg:hover:bg-gray-50 lg:p-2.5 inline-flex gap-3" href={item.path}>
                                {item.icon}
                                {item.title}
                                
                            </a>
                        </li>
                    ))
                }
                   
                
            </ul>
             )}

             { !user.isAuthenticated && (
                <ul className={`bg-white absolute bottom-0 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${state ? '' : 'lg:hidden'}`}>
                    {

                        <li>
                            <a className="block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5" href='/login'>
                                Login
                            </a>
                        </li>
                    }
                    
                    
                </ul>
             
            
            )}
        </div>
    )
}


// scroll direction hook
function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = React.useState('');

  React.useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (direction !== scrollDirection && (scrollY - lastScrollY > 5 || scrollY - lastScrollY < -5)) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    }
  }, [scrollDirection]);

  return scrollDirection;
};


export default () => {
    const [state, setState] = useState(false)
    const [userEmail, setUserEmail] = useState<string>('')

    const [menuState, setMenuState] = useState(false)
    const {cartItems, cartQuantity} = useCart();
    const user = useUser();

    const profileRef = useRef<UserSchema>();
    // use scroll direction defined above 
    const scrollDirection = useScrollDirection();


    useEffect(() => {

        if (user) {
            const profile = profileRef.current ? user.user?.email : "";
            setUserEmail(profile || 'Guest')

            // profileRef.current == user.user?.fullname || "Guest";
        }
        const handleDropDown = (e) => {
            if (!profileRef.current.contains(e.target)) setState(false)
        }
        document.addEventListener('click', handleDropDown)
    }, [user])
  


  // Replace javascript:void(0) path with your path
  const navigation = [

    { title: "Dashboard", path: "/user", icon: <LayoutDashboardIcon /> },
    { title: "Wishlist", path: "/user", icon: <Heart /> },

    { title: "Settings", path: "/settings", icon: <SettingsIcon /> },
    { title: "About", path: "/about", icon: <InfoIcon /> },
    { title: "Guides", path: "/guides", icon: <MenuIcon /> },
    { title: "Partners", path: "/partners", icon: <HandshakeIcon /> },
    { title: "Privacy and Safety", path: "/privacy", icon: <Lock /> },
    { title: "Careers", path: "/carrers", icon: <Waypoints /> },
    
    ]
    return (
        <nav className={`sticky ${ scrollDirection === "down" ? "-top-24" : "top-0"} bg-white md:hidden z-10  transition-all duration-500`}>
                {/* <nav className="bg-white md:hidden top-0 sticky z-10 "> */}

            <div className="flex items-center space-x-8 py-3 px-4 max-w-screen-xl mx-auto md:px-8">
                <div className="flex-none lg:flex-initial">
                    <a href="javascript:void(0)">
                        <h1 className='text-xl text-slate-400 font-extrabold'>KASU<span className='text-red-700'>WA</span></h1>

                    </a>
                </div>
                
                <div className="flex-1 flex items-center justify-between ">
                    <div className={`bg-white absolute z-20 w-full h-[90vh] top-16 left-0 p-4 border-b lg:static lg:block lg:border-none ${menuState ? '' : 'hidden'}`}>
                    <div className="flex items-center space-x-4">
                        <button ref={profileRef} className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 ring-2 lg:focus:ring-indigo-600"
                            onClick={() => setState(!state)}
                        >
                            {/* <img
                                src="https://randomuser.me/api/portraits/men/46.jpg"
                                className="w-full h-full rounded-full"
                            /> */}
                            <UserCircleIcon className="w-full h-full rounded-full" />
                        </button>
                        <div className="lg:hidden">
                            <span className="block">{profileRef.current?.fullname || 'Sabali Tzu'}</span>
                            <span className="block text-sm text-gray-500">{userEmail}</span>
                        </div>
                    </div>
                        <ul className="mt-12 space-y-5 lg:flex lg:space-x-6 lg:space-y-0 lg:mt-0">
                            {
                                navigation.map((item, idx) => (
                                    <li key={idx} className="text-gray-600 hover:text-gray-900">
                                        <a href={item.path} className="inline-flex gap-3">
                                            {item.icon}
                                            {item.title}
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                        <ProfileDropDown 
                            class="mt-5 pt-5 border-t lg:hidden"
                        />
                    </div>
                    <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-2">
                        <form className="flex items-center space-x-2 border rounded-md p-2 w-[60%]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-none text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                className="w-full outline-none appearance-none placeholder-gray-500 text-gray-500 sm:w-auto"
                                type="text"
                                placeholder="Search"
                            />
                        </form>
                        <ProfileDropDown 
                            class="hidden lg:block"
                        />
                        {/* <a href="/" className="inline-flex flex-col items-center justify-center px-1 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
                            <HeartIcon className="w-6 h-6 mb-1  text-gray-800 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-400" />
                        </a> */}
                        <a href="/cart">
                            <button
                                type="button"
                                className=""
                            >
                                {/* shopping cart */}
                                {cartItems ? cartItems && (
                                <span className='justify-center text-md text-slate-800 rounded-xl bg:ring-white'>{cartQuantity}</span>
                                ): <span className='justify-center text-md text-slate-800 rounded-xl bg:ring-white'>0</span>}
                                {/* <p className='text-[0.6rem] font-semibold font-mono'>Cart</p> */}
                                <ShoppingCartIcon aria-hidden="false" className="h-5 w-5 fill:black" />

                            </button>
                        </a>

                        <button 
                            className="outline-none text-gray-400 block lg:hidden"
                            onClick={() => setMenuState(!menuState)}
                        >
                            {
                                menuState ? (

                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <UserIcon aria-hidden="true" className="h-6 w-6 bg-transparent fill-slate-800" />

                                )
                            }
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}