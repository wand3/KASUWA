import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems, Description, Field, Input, Label } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { useCart } from '../hooks/UseCart';
import useUser from '../hooks/UseUser';
import Sidebar from "../components/Sidebar";



const navigation = [
  { name: 'Login', href: '/login', current: true },
]

const notUser = [
 {name: 'Logout', href: '/logout', current: true},
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Nav = () => {

  const {cartItems, cartQuantity} = useCart();

  console.log(cartQuantity)
  const user = useUser();
  const userEmail = user.user?.email.slice(0, 6).toString()

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
                    { user.isAuthenticated === true && (
                        <span className='flex absolute justify-center text-md mt-[-50%] ml-[85%] rounded-xl bg:ring-white'>{userEmail}</span>
                      )}
                    { !user.isAuthenticated && (
                       <span className='flex absolute justify-center text-md mt-[-50%] ml-[85%] rounded-xl bg:ring-white'>Guest!</span>
                      )} 
                    <p className='text-[0.6rem] font-semibold font-mono'>Hi!</p>
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  { !user.isAuthenticated && (
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
                    <MenuItem>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                        Sign out
                      </a>
                    </MenuItem>
                    </>
                  )}
                  { user.isAuthenticated && (
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
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
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
                    {cartItems ? cartItems && (
                      <span className='flex absolute justify-center text-md text-white mt-[-55%] ml-[85%] rounded-xl bg:ring-white'>{cartQuantity}</span>
                    ): <span className='flex absolute justify-center text-md text-white mt-[-55%] ml-[85%] rounded-xl bg:ring-white'>0</span>}
                    <p className='text-[0.6rem] font-semibold font-mono'>Cart</p>
                  </button>
                </a>
                
              </div>
              

              <div className="flex flex-none items-center justify-center sm:items-stretch sm:justify-start">
              
                <div className="hidden sm:ml-6 sm:block">
                  { user.isAuthenticated === true && (
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
                  )}
                  { !user.isAuthenticated && (
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

                  )} 
                  
                </div>
              </div>

            </div>
            
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">

          { user.isAuthenticated === true && (
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
          { !user.isAuthenticated && (
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
