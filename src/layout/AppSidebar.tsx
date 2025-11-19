
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GridIcon, UserCircleIcon, HorizontaLDots } from "../icons";
import { useSidebar } from "../context/SidebarContext";
import { useAuth } from "../context/AuthContext";
import SidebarWidget from "./SidebarWidget";

type UserRole = 'admin' | 'doctor' | 'patient';
type NavItem = {
  icon: React.ReactElement;
  name: string;
  path?: string;
  subItems?: { name: string; path: string }[];
  roles: UserRole[]; 

};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Admin Dashboard",
    roles: ['admin'], 
    subItems: [
      { name: "Dashboard", path: "/admin/dashboard" },
      { name: "Voucher Management", path: "/admin/voucher" },
      { name: "Patients", path: "/admin/patients" },
      { name: "User Management", path: "/admin/users" },
      { name: "Analytics & Reports", path: "/admin/analytics" },
      { name: "Settings", path: "/admin/settings/general" },
    ],
  },

  {
    icon: <UserCircleIcon />,
    name: "Doctor Dashboard",
    roles: ['doctor'], 
    subItems: [
      { name: "Dashboard", path: "/doctor/dashboard" },
      { name: "Patient Queue", path: "/doctor/Patientqueue" },
      { name: "Consultancy History", path: "/doctor/Consultancyhistory" },
      { name: "Patient Record", path: "/doctor/Patientrecord" },
      { name: "Schedule", path: "/doctor/Schedule" },
      { name: "Settings", path: "/doctor/settings/profile"},
    ],
  },

  {
    icon: <UserCircleIcon />,
    name: "Patient Dashboard",
    roles: ['patient'], 
    subItems: [
      { name: "Dashboard", path: "/patient/patientdashboard" }
    ],
  },
];

const AppSidebar = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  type OpenSubmenu = { type: string; index: number } | null;
  const [openSubmenu, setOpenSubmenu] = useState<OpenSubmenu>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<{ [key: string]: number }>({});
  const subMenuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const filteredNavItems = React.useMemo(() => {
    if (!isAuthenticated || !user) return [];
    return navItems.filter((nav) => nav.roles.includes(user.role));
  }, [isAuthenticated, user]);

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );


  useEffect(() => {
    // Sync open submenu to the current pathname but avoid setting state
    // to a new object repeatedly when nothing actually changed.
    let submenuMatched = false;
    filteredNavItems.forEach((nav, index) => {
      if (nav.subItems) {
        nav.subItems.forEach((subItem) => {
          if (subItem.path === location.pathname) {
            setOpenSubmenu((prev) =>
              prev && prev.index === index ? prev : { type: "main", index }
            );
            submenuMatched = true;
          }
        });
      }
    });

    if (!submenuMatched) {
      setOpenSubmenu((prev) => (prev === null ? prev : null));
    }
  }, [location.pathname, filteredNavItems]);
  
  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `main-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenu((prev) =>
      prev && prev.index === index ? null : { type: "main", index }
    );
  };

  const renderMenuItems = (items: typeof filteredNavItems) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <>
              <button
                onClick={() => handleSubmenuToggle(index)}
                className={`menu-item group ${
                  openSubmenu?.index === index
                    ? "menu-item-active"
                    : "menu-item-inactive"
                } cursor-pointer ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "lg:justify-start"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    openSubmenu?.index === index
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </button>

              {(isExpanded || isHovered || isMobileOpen) && (
                <div
                  ref={(el) => {
                    subMenuRefs.current[`main-${index}`] = el;
                  }}
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    height:
                      openSubmenu?.index === index
                        ? `${subMenuHeight[`main-${index}`]}px`
                        : "0px",
                  }}
                >
                  <ul className="mt-2 space-y-1 ml-9">
                    {nav.subItems.map((subItem) => (
                      <li key={subItem.name}>
                        <Link
                          to={subItem.path}
                          className={`menu-dropdown-item ${
                            isActive(subItem.path)
                              ? "menu-dropdown-item-active"
                              : "menu-dropdown-item-inactive"
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <Link
              to={nav.path!}
              className={`menu-item group ${
                isActive(nav.path!) ? "menu-item-active" : "menu-item-inactive"
              }`}
            >
              <span
                className={`menu-item-icon-size ${
                  isActive(nav.path!)
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
  
  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >           
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                className="dark:hidden"
                src="/images/Group 84 (1).svg"
                alt="Logo"
                width={150}
                height={40}
              />
              <img
                className="hidden dark:block"
                src="/images/logo/logo-dark.svg"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <img
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(filteredNavItems)}
            </div>
          </div>
        </nav>
        {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null}
      </div>
    </aside>
  );
};

export default AppSidebar;