import {
  ABOUT_US,
  All_Users_List_Icon,
  Categories_SVG,
  Cross_SVG,
  DISCOUNT,
  Dashboard_Icon,
  EVENT,
  Jobs_SVG,
  LOGOUT,
  Logo,
  MANAGE_ATTENDANCE,
  Menu_SVG,
  PRIVACY_AND_POLICY,
  PUBLIC_AFFILIATE_USER,
  PUBLIC_RELATION_USER,
  SEARCH,
  SEARCH_ICON,
  Service_Provider_SVG,
  TERMS_AND_CONDITIONS,
  TRANSACTION,
  VEHICLE,
} from "@/utils/svgGrabber";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ROUTES } from "@/utils/Routes";
import { toast } from "react-toastify";
// import { onChange } from 'react-toastify/dist/core/store';

const notifications = [
  {
    src: "/images/notification1.png",
    heading: "Edit your information in a swipe",
    para: "With just a swipe of your finger you can delete an email or flag one for follow-up. All it takes is a multi-touch trackpad or magic mouse.",
    date: "Jan 13, 2024",
  },
  {
    src: "/images/notification2.png",
    heading: "Customize swipe left and right",
    para: "All it takes is a multi-touch trackpad or magic mouse.",
    date: "Sep 13, 2024",
  },
  {
    src: "/images/notification3.png",
    heading: "Say goodbye ro paper receipts!",
    para: "Discover how industry professionals leverage Microsoft 365 to communicate, collaborate, and improve productivity across the team and organization.",
    date: "Oct 13, 2024",
  },
];

const Menu_Item_Li = ({
  index,
  setSelectedMenu,
  Menu,
  selectedMenu,
  open,
  func,
  router,
  handleClick,
}) => {
  const handleItemClick = () => {
    if (router.asPath.includes(Menu.base)) return;
    if (func) {
      setSelectedMenu(selectedMenu === Menu.title ? router.asPath : Menu.title);
    }

    // Close sidebar if on mobile view
    if (window.matchMedia("(max-width: 640px)").matches) {
      handleClick();
    }
  };

  return (
    <li
    key={index}
    onClick={handleItemClick}
    className={`flex ${
      selectedMenu === Menu.link ||
      router.asPath.includes(Menu.sub_pages) ||
      selectedMenu === Menu.title ||
      router.asPath.includes(Menu.base)
        ? "bg-[#D1AA66] text-white"
        : "text-black"
    } rounded-lg py-2.5  
        ${
          open ? "px-5 sm:flex" : "justify-center"
        } hover:bg-hover_effect cursor-pointer hover:bg-light-white text-sm items-center gap-x-2 
        ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"} 
        hover:text-black`} // Added hover:text-black
  >
      {Menu.svg}
      <span
        className={`${
          !open && "hidden"
        } origin-left font-normal duration-200 flex justify-between w-full items-center`}
      >
        {Menu.title}
        {Menu.showDot && !router.asPath.includes(Menu.link) && (
          <span className={`${Menu.dotColor} w-2 h-2 rounded-full`}></span>
        )}
      </span>
    </li>
  );
};

const MenuItem = ({
  array,
  open,
  selectedMenu,
  setSelectedMenu,
  router,
  handleClick,
}) => {
  return (
    <ul>
      {array.map((Menu, index) => (
        <div key={index}>
          {Menu?.more ? (
            <Menu_Item_Li
              func={true}
              router={router}
              Menu={Menu}
              index={index}
              open={open}
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
              handleClick={handleClick}
            />
          ) : (
            <Link href={Menu.link || "/"}>
              <Menu_Item_Li
                Menu={Menu}
                router={router}
                index={index}
                open={open}
                selectedMenu={selectedMenu}
                setSelectedMenu={setSelectedMenu}
                handleClick={handleClick}
              />
            </Link>
          )}
        </div>
      ))}
    </ul>
  );
};

const StoreLayout = ({ children, searchValue, onChange }) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false); // To track if the screen is mobile

  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const router = useRouter();

  const divStyle = {
    boxShadow: `0px 0px 30px 0px #0C25560D`,
  };
  const sideBarShadow = {
    boxShadow: `0px 0px 30px 0px #0C25560D`,
  };

  const MAIN_MENUS = [
    { title: "Dashboard", svg: <Dashboard_Icon />, link: "/dashboard" },
    {
      title: "Users",
      svg: <All_Users_List_Icon />,
      link: "/dashboard/users",
      showDot: true,
      dotColor: "bg-success",
    },
    { title: "Ranking", svg:<EVENT />, link: "/dashboard/ranking" },

    {
      title: "Rewards",
      svg: <MANAGE_ATTENDANCE />,
      link: "/dashboard/rewards",
    },
    {
      title: "Leader Board",
      svg: <DISCOUNT />,
      link: "/dashboard/leaderBoard",
    },
 
    {
      title: "Terms and Conditions",
      svg: <TERMS_AND_CONDITIONS />,
      link: "/dashboard/termsAndCondition",
    },
    {
      title: "Privacy Policy",
      svg: <PRIVACY_AND_POLICY />,
      link: "/dashboard/privacyAndPolicy",
    },
    { title: "About Us", svg: <ABOUT_US />, link: "/dashboard/aboutUs" },
    {
      title: "Contact Us",
      svg: <Service_Provider_SVG />,
      link: "/dashboard/contactUs",
    },
    // { title: "Jobs", svg: <Jobs_SVG />, link: "/dashboard/jobs" },
    // { title: "Service Provider", svg: <Service_Provider_SVG />, link: "/dashboard/service-provider", showDot: true, dotColor: "bg-primary" },
    // { title: "Categories", svg: <Categories_SVG />, link: "/dashboard/categories" },
  ];

  useEffect(() => {
    if (!router.query) return;
    setSelectedMenu(router.asPath);
  }, [router.query]);

  useEffect(() => {
    const stUser = localStorage.getItem("auth_user");
    setUser(JSON.parse(stUser));
  }, []);

  useEffect(() => {
    // Determine initial sidebar state and mobile status based on screen size
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setOpen(true);
        setIsMobile(false);
      } else {
        setOpen(false);
        setIsMobile(true);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("auth_user");
    toast.success("Logout Success!", { autoClose: 2000 });
    router.push(ROUTES.SIGN_IN);
  };

  const handleClick = () => {
    if (window.innerWidth < 640) {
      setOpen(!open);
    }
  };
  return (
    <div className="flex overflow-hidden max-h-[100vh]">
      <div
       style={{ background: 'white' }}
        className={` ${
          open ? "sm:w-72 w-80 sm:min-w-52" : "sm:w-20 w-0 sm:min-w-20"
        } bg-white z-50 py-3 select-none sm:!relative sm:h-auto max-h-[100vh] min-h-screen fixed -left-0 duration-300`}
      >
        <span
          style={sideBarShadow}
          className="bg-white sm:block hidden absolute z-0 text-secondary p-4 -rotate-45 -right-6 rounded-[0.7rem] top-28 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <svg
            className={`w-4 transform ${
              !open ? "!rotate-45" : "-rotate-[135deg]"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>

        <div
          className={`flex items-center pb-2 ${
            open ? "pl-[38%] justify-between" : "px-5"
          }`}
        >
          <div
            className={`${
              !open && "sm:pl-0 pl-3"
            } hidden md:block cursor-pointer duration-500`}
          >
           <Logo customClass={`${open ? "w-100" : "w-16"}`} />
          </div>
          <div
            onClick={handleClick}
            className={`text-primary font-semibold origin-left text-xl duration-200 
                          ${!open && "sm:scale-0 sm:static fixed -left-1"} 
                           ${
                             open &&
                             "sm:static right-2 sm:left-0 absolute md:-right-1"
                           }`}
          >
            {/* <div className={`icon-container transform transition-transform duration-300 ease-in-out `}>
                            {isMobile && open ? (<Cross_SVG customClass="icon" />) : <Menu_SVG customClass={`icon ${!isMobile ? "block mr-3" : "hidden"}`} />}
                        </div> */}
          </div>
        </div>
        <div className="pt-1 px-4 border-b pb-5 main-blue-sidebar">
          <MenuItem
            array={MAIN_MENUS}
            open={open}
            selectedMenu={selectedMenu}
            router={router}
            setSelectedMenu={setSelectedMenu}
            handleClick={handleClick}
          />
        </div>
      </div>

      <div className="flex flex-col w-full overflow-hidden max-w-full">
        {/* Header */}
        <div
          className="bg-white flex items-center min-h-[3.5rem] md:min-h-[5rem]"
          style={divStyle}
        >
          <div className="w-[20%] md:block hidden text-sm  px-4 text-[#727983]">
            <h1>KYT Dental Reward V 1.0</h1>
          </div>
          <div
            className={`${open && "hidden md:flex"}
                     flex items-center !z-50 !w-full fixed md:!static  justify-between md:justify-end gap-5 px-2  md:px-7`}
          >
            <div className="md:hidden" onClick={handleClick}>
              <Menu_SVG customClass="icon" />
            </div>
            <div
              className={`${
                !open && "sm:pl-0 pl-3"
              } md:hidden cursor-pointer duration-500`}
            >
              <Logo customClass={`${open ? "sm:w-20 w-14" : "w-14"}`} />
            </div>
            {/* <div className="hidden relative border md:flex items-center border-[#1A55A5] w-64 h-9 px-2 rounded-full">
              <SEARCH className={"absolute"} />
              <input
                onChange={onChange}
                value={searchValue}
                className="outline-none pl-5 pr-1 w-full placeholder:text-sm placeholder:text-[#CACEDC] text-gray-400 text-sm"
                type="text"
                placeholder="Search..."
              />
            </div> */}
            {/* <p className=' text-sm md:block hidden text-[#727983] '>Last login: 19:00:00 - 12/02/2024</p> */}

            {/* <img className={`cursor-pointer hidden md:block w-8 h-8`} src="/icons/setting.png" alt="" /> */}

            <div className="flex items-center gap-3 cursor-pointer relative group">
              <img
                src={user?.picture || "/icons/profile.jpg"}
                className={`duration-500 rounded-full w-8 h-8 object-cover`}
                alt="Profile Icon"
              />
              <h1 className="text-[#324253] hidden md:block text-[12px]">
                {user?.name}
              </h1>
              {/* ==============    profile popup ================== */}
              <div className="absolute flex justify-center items-center flex-col top-11 md:top-14 right-0  md:-left-44 z-50 min-w-64 min-h-60 bg-white border border-gray-200 shadow-md rounded-md p-2 invisible opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
                <div className="flex flex-col gap-y-1">
                  <img className="h-24 rounded-full" src="/icons/profile.jpg" alt="" />
                  <h1 className="text-center">{user?.name}</h1>
                  <p className="text-xs text-[#1A55A5] text-center font-medium">
                   Profile
                  </p>
                </div>
                <div className="border-b border-1 my-2 border-gray-300 w-full" />
                <div className="flex gap-3 items-center">
                  {/* <button className="border border-[#E2E8F0] hover:bg-blue-100 text-sm  p-2 rounded-md">
                    Login History
                  </button> */}
                  <button
                    onClick={handleLogOut}
                    className="flex gap-2 items-center text-sm hover:bg-blue-100  p-2 border border-[#E2E8F0] rounded-md"
                  >
                    Logout{" "}
                    <span>
                      <LOGOUT />
                    </span>
                  </button>
                </div>
              </div>
              {/* ==============    profile popup ================== */}
            </div>
          </div>
        </div>
        {/* Header */}

        {/* Content */}
        <div className="flex-1 sm:py-16 py-5 px-3 md:p-7 overflow-auto">
          {children}
        </div>
        {/* Content */}

        {/* Footer */}
        <div
          style={divStyle}
          className="bg-white fixed bottom-0 w-full h-[2.5rem] px-7"
        >
          <p className="text-xs text-[#4B5864] pt-3">
            © 2024 All Rights Reserved by KYT Dental Reward
          </p>
        </div>
        {/* Footer */}
      </div>
    </div>
  );
};

export default StoreLayout;
