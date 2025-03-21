import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems, Description, Field, Input, Label } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import useUser from '../hooks/UseUser';
import UseApi from '../hooks/UseApi';
import { useEffect, useState } from 'react';
import { UserSchema } from '../context/UserProvider';
import { CartSchema } from '../context/CartProvider';

// redux thunk 
import { useGetCartDetailsQuery } from "../slices/CartSlice"


const navigation = [
  { name: 'Login', href: '/login', current: true },
]

const notUser = [
  { name: 'Logout', href: '/logout', current: true},
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Nav = () => {
  // const { loading, error, success } = useSelector((state: RootState) => state.cartApi); // Type-safe selector

  const [username, setUsername] = useState<string>('');
  const [ isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [ cartQuantity, setcartQuantity] = useState<number>(0);
  
  // use store 
  const { data: currentCart, error } = useGetCartDetailsQuery(undefined, {
    skip: !localStorage.getItem('token'), // Skip query if no token
    refetchOnMountOrArgChange: true,
    pollingInterval: 4000
  });


  const user = useUser();
  const api = UseApi();

  // Fetch user function
  const fetchUser = async () => {
      try {
          const response = await api.get<UserSchema>('/user');
          console.log(response)
          const data = response.body;
          setUsername(data?.email as string)
      } catch (error) {
          setUsername('Guest'); // Handle error state
      }
  };

  // Fetch cart function
  // const fetchCartItems = async () => {
  //     try {
  //       const response = await api.get<CartSchema>('/cart');
  //       console.log(response)
  //       // const count = response.body?.items.length
  //       const data = response.body;
  //       console.log(data)
  //       setCartItems(data)
  //       // console.log(count)
  //       if (cartItems?.items) {
  //         setcartQuantity(data?.items.length as number);
  //       }
  //       // setcartQuantity(count as number);

  //     } catch (error) {
  //         // setCartItems(null); // Handle error state
  //         setcartQuantity(0);
  //     }
  // };


  useEffect(() => {
    (async () => {
      await fetchUser();
      // await fetchCartItems();

      // await refetch();

      if (api.isAuthenticated()) {
        setIsAuthenticated(true);
        // if (currentCart) {
        //   setcartQuantity(currentCart.items.length)

        // }
        console.log('authentication state updated')
        const response = await api.get<UserSchema>('/user');
        console.log(response)
        if (response.body === null){
          setUsername('Guest')
        } else {
        setUsername(response.body?.email as string);
        if (currentCart) {
          if (currentCart.items.length > 0) {
            setcartQuantity(currentCart.items.length)
          }
          else {
            setcartQuantity(0)
          }
        }
        }
      }
    })();
  }, [api]);


  return (
    <>
      <Disclosure as="nav" className="hidden md:block bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
              </DisclosureButton>
            </div>

            {/* nav brand  */}
            <a href="/">
              <div className="flex flex-shrink-0 items-center">
                <h1 className='text-2xl text-slate-400 font-extrabold'>KASU<span className='text-red-700'>WA</span></h1>
                {/* <img
                  alt="Your Company"
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                  className="h-8 w-auto"
                /> */}
              </div>
            </a>
            <div className="flex w-[40%] items-center sm:w-full max-w-md px-4">
              <Field>
                  <Input
                  placeholder='Search'
                  className={clsx(
                      
                  'block w-[38%] rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                  'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                  'md:w-auto' // Make input auto-width in medium screens
                  )}
                  />
              </Field>
              </div>
            <div className="absolute inset-y-0 gap-x-3 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div className='relative flex mt-[5px] mr-[50px] text-white rounded-lg p-1 bg-gray-800 text-sm focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-400'>
                  <MenuButton className="">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <UserIcon aria-hidden="true" className="h-6 w-6 bg-transparent fill-white" />
                    { isAuthenticated === true && (
                        <span className='flex absolute justify-center text-md mt-[-50%] ml-[85%] rounded-xl bg:ring-white'>{username.slice(0, 6).toString()}</span>
                      )}
                    { isAuthenticated === false && (
                       <span className='flex absolute justify-center text-md mt-[-50%] ml-[85%] rounded-xl bg:ring-white'>Guest!</span>
                      )} 
                    <p className='text-[0.6rem] font-semibold font-mono'>Hi!</p>
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  { isAuthenticated === false && (
                    <>
                    <MenuItem>

                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                        Sign in
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                        Sign up
                      </a>
                    </MenuItem>
                    {/* <MenuItem>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                        Sign out
                      </a>
                    </MenuItem> */}
                    </>
                  )}
                  { isAuthenticated === true && (
                    <>
                    <MenuItem>

                      <a href="/user" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                        Profile
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                        Settings
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a href="/logout" onClick={user.logout} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                        Sign out
                      </a>
                    </MenuItem>
                    </>
                  )}
                </MenuItems>
              </Menu>
              <div className='relative rounded-full bg-gray-800 p-1 mt-[5px] text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                <a href="/cart">
                  <button
                    type="button"
                    className=""
                  >
                    {/* shopping cart */}
                    <ShoppingCartIcon aria-hidden="false" className="h-6 w-6 fill:black" />
                    <span className='flex absolute justify-center text-md text-white mt-[-55%] ml-[85%] rounded-xl bg:ring-white'>
                      {currentCart?.items?.length ?? 0}
                    </span>
              
                    <p className='text-[0.6rem] font-semibold font-mono'>Cart</p>
                  </button>
                </a>
                
              </div>
              

              <div className="flex flex-none items-center justify-center sm:items-stretch sm:justify-start">
              
                <div className="hidden sm:ml-6 sm:block">
                  { isAuthenticated ? isAuthenticated && (
                    <div className="flex space-x-4">
                      
                      {notUser.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          onClick={user.logout}
                          aria-current={item.current ? 'page' : undefined}
                          className={classNames(
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium icon-hover-inner-desktop icon-hover-desktop',
                          )}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  ): 
                  <div className="flex space-x-4">
                      
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          aria-current={item.current ? 'page' : undefined}
                          className={classNames(
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium icon-hover-inner-desktop icon-hover-desktop',
                          )}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  }
                          
                </div>
              </div>

            </div>
            
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">

          { isAuthenticated === true && (
            <div className="space-y-1 px-2 pb-3 pt-2">
              {notUser.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          )}
          { username === "Guest" && (
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          )} 
          
        </DisclosurePanel>

        
      </Disclosure>

              {/* {sidebar && <Sidebar />} */}


    </>
  )
}

export default Nav;
