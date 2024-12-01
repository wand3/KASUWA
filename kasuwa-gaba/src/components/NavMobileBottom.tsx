// import {  HomeIcon, ShoppingCartIcon, UserIcon } from "@heroicons/react/24/solid";
import { HomeIcon, HeartIcon, ArrowTrendingUpIcon, ShieldCheckIcon  } from "@heroicons/react/24/outline";
import React from "react";


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



const NavButtomMobile = () => {

    const scrollDirection = useScrollDirection();

    return (
        <> 
            <div className={`sticky ${ scrollDirection === "down" ? "-top-24" : "bottom-0"} hidden rounded-full bg-slate-500/50 md:hidden z-10 p-3 transition-all duration-500`}>
                <div className="grid h-full max-w-lg grid-cols-4 mx-auto">
                    <a href="/" className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        <HomeIcon className="w-6 h-6 mb-1  text-gray-100 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-400" />
                    </a>
                    
                    <a href="/" className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        <HeartIcon className="w-6 h-6 mb-1  text-gray-800 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-400" />
                    </a>
                    
                    {/* //<div className="flex items-center justify-center">
                        <button data-tooltip-target="tooltip-new" type="button" className="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
                            <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                            </svg>
                            <span className="sr-only">New item</span>
                        </button>
                    </div>//
                     */}
                    

                    <a href="/cart" className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        <ArrowTrendingUpIcon className="w-6 h-6 mb-1  text-gray-800 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-400" />
                    </a>
                    
                    <a href="/user" className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        <ShieldCheckIcon className="w-6 h-6 mb-1  text-gray-800 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-400" />
                    </a>
                </div>
            </div>

        </>
    
    )

}

export default NavButtomMobile;