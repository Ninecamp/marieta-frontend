import { useState, useEffect, useRef } from "react";
import { Menu, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
// import { downloadPdf } from "../api/fetch";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showMobileSubmenu, setShowMobileSubmenu] = useState(false);
  const [activePage, setActivePage] = useState("home"); // Default active page
  const menuRef = useRef(null);
  const location = useLocation();

  // const handlePdfOpen = async (type) => {
  //   try {
  //     const pdfBlob = await downloadPdf(type); // This should return a Blob response
  //     const pdfUrl = URL.createObjectURL(pdfBlob);
  //     window.open(pdfUrl, "_blank");
  //   } catch (error) {
  //     console.error("Error opening PDF:", error);
  //   }
  // };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      setIsSmallScreen(window.matchMedia("(max-width: 768px)").matches);
    };

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowDialog(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    handleResize();
    handleScroll();

    const path = location.pathname;
    if (path === "/") {
      setActivePage("home");
    } else if (path === "/contact") {
      setActivePage("contact");
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [location]);

  // Get color for a navigation item
  const getNavItemColor = (pageName) => {
    if (activePage === pageName && !isSmallScreen) {
      return "text-[#d5d5d5]";
    }

    // Green only when scrolled or small screen, otherwise white
    if (isScrolled || isSmallScreen) {
      return "text-[#324c22]";
    } else {
      return "text-white hover:text-[#d5d5d5]";
    }
  };

  // Common text style classes
  const textStyles = "text-[13px] leading-4 font-semibold tracking-wider"; // Using Tailwind equivalents for the requested styles

  return (
    <div
      className={`fixed top-0 left-0 w-full transition-all duration-300 z-50 py-1 ${
        isScrolled
          ? "bg-white shadow-md"
          : isSmallScreen
          ? "bg-white shadow-md"
          : "bg-transparent"
      }`}
    >
      <div
        className={`items-center justify-center px-8 py-4 ${
          isScrolled
            ? "flex relative"
            : isSmallScreen
            ? "flex"
            : "flex flex-col"
        }`}
      >
        {isSmallScreen && (
          <button
            className="absolute left-5 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="text-black w-6 h-6" />
          </button>
        )}

        <img
          src={`${
            isScrolled
              ? "/png/M-logo-11Dark.png"
              : isSmallScreen
              ? "/png/M-logo-11Dark.png"
              : "/png/M-logo-11.png"
          }`}
          alt="Logo"
          width={`${isScrolled ? "50" : isSmallScreen ? "50" : "80"}`}
          height={`${isScrolled ? "50" : isSmallScreen ? "50" : "80"}`}
          className={`transition-transform duration-300 ${
            isScrolled && !isSmallScreen && "absolute left-8 mt-5"
          } ${!isSmallScreen && "mb-6"} `}
        />

        {!isSmallScreen && (
          <nav
            className={`hidden fontWeight-large md:flex gap-8 uppercase ${textStyles} ${
              isScrolled && "self-center"
            }`}
          >
            <Link
              to="/"
              className={`font-montserrat transition-colors ${getNavItemColor(
                "home"
              )}`}
              onClick={() => setActivePage("home")}
            >
              Home
            </Link>
            <div
              className="font-montserrat fontWeight-large relative"
              ref={menuRef}
            >
              <span
                className={`transition-colors ${getNavItemColor(
                  "menu"
                )} flex items-center cursor-pointer`}
                onMouseEnter={() => setShowDialog(true)}
                onMouseLeave={() => {
                  // Small delay to check if cursor moved to dropdown
                  setTimeout(() => {
                    if (!menuRef.current?.querySelector(".dropdown:hover")) {
                      setShowDialog(false);
                    }
                  }, 100);
                }}
              >
                Menu
              </span>
              {showDialog && (
                <div
                  className={`dropdown absolute top-full mt-[45%] flex flex-col gap-[1em] transition bg-black text-white p-4 w-[450%] opacity-80 py-[70%] shadow-lg ${textStyles}`}
                  onMouseEnter={() => setShowDialog(true)}
                  onMouseLeave={() => setShowDialog(false)}
                >
                  <Link
                    to={`/pdf/food`}
                    className="block text-white hover:text-gray-50 transition-colors text-left"
                  >
                    Food
                  </Link>
                  <Link
                    to={`/pdf/bar`}
                    className="block text-white hover:text-gray-50 transition-colors text-left"
                  >
                    Bar
                  </Link>
                </div>
              )}
            </div>
            <Link
              to="/contact"
              className={`font-montserrat fontWeight-large transition-colors ${getNavItemColor(
                "contact"
              )}`}
              onClick={() => setActivePage("contact")}
            >
              Contact
            </Link>
          </nav>
        )}
      </div>

      {isMenuOpen && isSmallScreen && (
        <nav
          className={`flex flex-col bg-white p-4 md:hidden text-left pl-8 ${textStyles}`}
        >
          <Link
            to="/"
            className={`transition-colors py-2 ${getNavItemColor("home")}`}
            onClick={() => {
              setActivePage("home");
              setIsMenuOpen(false);
            }}
          >
            Home
          </Link>

          <div className="py-2">
            <div
              className={`flex items-center justify-between pr-8 ${getNavItemColor(
                "menu"
              )}`}
              onClick={() => setShowMobileSubmenu(!showMobileSubmenu)}
            >
              <span
                className="transition-colors cursor-pointer"
                onClick={() => {
                  setActivePage("menu");
                }}
              >
                Menu
              </span>
              <ChevronDown className="w-4 h-4" />
            </div>

            {showMobileSubmenu && (
              <div className="pl-4 mt-2 space-y-2">
                <Link
                  to={`/pdf/food`}
                  className="block text-[#324c22] hover:text-black transition-colors text-left"
                >
                  Food
                </Link>
                <Link
                  to={`/pdf/bar`}
                  className="block text-[#324c22] hover:text-black transition-colors text-left"
                >
                  Bar
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/contact"
            className={`transition-colors py-2 ${getNavItemColor("contact")}`}
            onClick={() => {
              setActivePage("contact");
              setIsMenuOpen(false);
            }}
          >
            Contact
          </Link>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
