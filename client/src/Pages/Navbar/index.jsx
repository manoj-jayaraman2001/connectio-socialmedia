import { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import { setLogout } from "../../State";
import { setMode } from "../../State";
import {
  Bars3Icon,
  XMarkIcon,
  MoonIcon,
  ChatBubbleLeftEllipsisIcon,
  BellAlertIcon,
  QuestionMarkCircleIcon,
  UserCircleIcon,
  HomeModernIcon,
} from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfilePic from "../../components/ProfilePic";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fullName = `${user.firstName} ${user.lastName}`;
  const profileImg = user.picturePath;
  const isDark = Boolean(useSelector((state) => state.mode === "dark"));
  const products = [
    { name: "My Profile", href: `/profile/${user._id}`, icon: UserCircleIcon },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <header className={isDark ? "bg-bgNavDark" : "bg-white"}>
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Connectio</span>
            <img className="h-8 w-auto" src={logo} alt="Connectio" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex items-end lg:gap-x-12 ml-36">
          <NavLink to="/home/feed" title="Home">
            {({ isActive, isPending }) => {
              return (
                <HomeModernIcon
                  className={`h-6 w-6 ${
                    isActive ? "text-primary" : "text-gray-400"
                  }`}
                />
              );
            }}
          </NavLink>

          <NavLink to="/home/messages" title="Messages">
            {({ isActive, isPending }) => {
              return (
                <ChatBubbleLeftEllipsisIcon
                  className={`h-6 w-6 ${
                    isActive ? "text-primary" : "text-gray-400"
                  }`}
                />
              );
            }}
          </NavLink>
          <NavLink to="/home/notifications" title="Notifications">
            {({ isActive, isPending }) => {
              return (
                <BellAlertIcon
                  className={`h-6 w-6 ${
                    isActive ? "text-primary" : "text-gray-400"
                  }`}
                />
              );
            }}
          </NavLink>
          <NavLink to="/home/help" title="Help">
            {({ isActive, isPending }) => {
              return (
                <QuestionMarkCircleIcon
                  className={`h-6 w-6 ${
                    isActive ? "text-primary" : "text-gray-400"
                  }`}
                />
              );
            }}
          </NavLink>

          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1  leading-6 ml-12 outline-none">
              <ProfilePic dimension={"h-6 w-6"} picturePath={profileImg} />
              <span
                className={`text-base ${
                  isDark ? "text-gray-300" : "text-gray-900"
                } font-LatoFont`}
              >
                {fullName}
              </span>
              <ChevronDownIcon
                className="h-6 w-6 flex-none text-primary"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                className={`absolute -left-8 top-full z-10 mt-3  w-max overflow-hidden rounded-3xl ${isDark ? 'bg-bgDarkWidget' : 'bg-white'} shadow-lg ring-1 ring-gray-900/5`}
              >
                <div className="p-2">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg">
                        <item.icon
                          className="h-6 w-6 text-gray-300 group-hover:text-indigo-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <Link
                          to={item.href}
                          className={`block font-semibold ${isDark ?'text-gray-200':  'text-gray-900'}`}
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <div
            title="Change Theme"
            onClick={() => {
              dispatch(
                setMode()
              );
            }}
          >
            <MoonIcon
              className={`h-5 w-5 ${
                isDark ? "text-white" : "text-black"
              } text-black mr-16 mt-1 cursor-pointer`}
            />
          </div>
          <Link
            to="/"
            onClick={() => {
              dispatch(setLogout());
            }}
            className="text-sm font-semibold leading-6 text-primary"
          >
            Log out <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Connectio</span>
              <img className="h-8 w-auto" src={logo} alt="Connectio" />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        {fullName}
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none"
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...products].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="Link"
                            to={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <NavLink to="/home/feed" title="Home">
                  {({ isActive, isPending }) => {
                    return (
                      <>
                        <HomeModernIcon
                          className={`h-6 w-6 ${
                            isActive ? "text-primary" : "text-gray-400"
                          }`}
                        />
                        <span>Home</span>
                      </>
                    );
                  }}
                </NavLink>

                <NavLink to="/home/messages" title="Messages">
                  {({ isActive, isPending }) => {
                    return (
                      <>
                        <ChatBubbleLeftEllipsisIcon
                          className={`h-6 w-6 ${
                            isActive ? "text-primary" : "text-gray-400"
                          }`}
                        />
                        <span>Messages</span>
                      </>
                    );
                  }}
                </NavLink>
                <NavLink to="/home/notifications" title="Notifications">
                  {({ isActive, isPending }) => {
                    return (
                      <>
                        <BellAlertIcon
                          className={`h-6 w-6 ${
                            isActive ? "text-primary" : "text-gray-400"
                          }`}
                        />
                        <span>Notifications</span>
                      </>
                    );
                  }}
                </NavLink>
                <NavLink to="/home/help" title="Help">
                  {({ isActive, isPending }) => {
                    return (
                      <>
                        <QuestionMarkCircleIcon
                          className={`h-6 w-6 ${
                            isActive ? "text-primary" : "text-gray-400"
                          }`}
                        />
                        <span>Help</span>
                      </>
                    );
                  }}
                </NavLink>
              </div>
              <div className="py-6">
                <Link
                  to="/"
                  onClick={() => {
                    dispatch(setLogout());
                  }}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log out
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
