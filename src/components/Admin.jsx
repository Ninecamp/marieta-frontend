import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  authenticateAdmin,
  uploadPdf,
  downloadPdf,
  checkPdfAvailability,
} from "../api/fetch";

const Admin = () => {
  const [foodPdf, setFoodPdf] = useState(null);
  const [barPdf, setBarPdf] = useState(null);
  const [foodPdfName, setFoodPdfName] = useState("No file selected");
  const [barPdfName, setBarPdfName] = useState("No file selected");
  const [uploading, setUploading] = useState({ food: false, bar: false });
  const [downloading, setDownloading] = useState({ food: false, bar: false });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [password, setPassword] = useState("");
  const [currentFoodPdf, setCurrentFoodPdf] = useState({ filename: "" });
  const [currentBarPdf, setCurrentBarPdf] = useState({ filename: "" });
  const [pdfAvailability, setPdfAvailability] = useState({
    foodPdf: false,
    barPdf: false,
  });
  const navigate = useNavigate();
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (!auth) {
      return;
    }
    setFetching(true);
    checkPdfAvailability().then((data) => {
      setPdfAvailability(data);
      if (data.foodPdf) {
        setCurrentFoodPdf({ filename: "food-menu.pdf" });
      }
      if (data.barPdf) {
        setCurrentBarPdf({ filename: "bar-menu.pdf" });
      }
      setFetching(false);
    });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setMessage({ text: "Password is required", type: "error" });
      return;
    }

    try {
      setMessage({ text: "Authenticating...", type: "info" });
      await authenticateAdmin(password);
      localStorage.setItem("admin_auth", "true");
      setMessage({ text: "Login successful!", type: "success" });

      const availabilityData = await checkPdfAvailability();
      setPdfAvailability(availabilityData);

      if (availabilityData.foodPdf) {
        setCurrentFoodPdf({ filename: "food-menu.pdf" });
      }

      if (availabilityData.barPdf) {
        setCurrentBarPdf({ filename: "bar-menu.pdf" });
      }
    } catch (error) {
      setMessage({ text: "Invalid password", type: "error" });
      console.error("Authentication error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    navigate("/");
  };

  const handlePdfChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setMessage({ text: "Please select a valid PDF file.", type: "error" });
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setMessage({
        text: "File is too large. Maximum size is 25MB.",
        type: "error",
      });
      return;
    }

    if (type === "food") {
      setFoodPdf(file);
      setFoodPdfName(file.name);
    } else {
      setBarPdf(file);
      setBarPdfName(file.name);
    }
    setMessage({ text: "", type: "" });
  };

  const handleUpload = async (type) => {
    const selectedFile = type === "food" ? foodPdf : barPdf;
    if (!selectedFile) {
      setMessage({
        text: `Please select a ${type} menu PDF first.`,
        type: "error",
      });
      return;
    }

    setUploading((prev) => ({ ...prev, [type]: true }));
    setMessage({ text: `Uploading ${type} menu...`, type: "info" });

    try {
      await uploadPdf(selectedFile, type);

      if (type === "food") {
        setFoodPdf(null);
        setFoodPdfName("No file selected");
        setCurrentFoodPdf({ filename: selectedFile.name });
        setPdfAvailability((prev) => ({ ...prev, foodPdf: true }));
      } else {
        setBarPdf(null);
        setBarPdfName("No file selected");
        setCurrentBarPdf({ filename: selectedFile.name });
        setPdfAvailability((prev) => ({ ...prev, barPdf: true }));
      }

      setMessage({
        text: `${
          type.charAt(0).toUpperCase() + type.slice(1)
        } menu uploaded successfully!`,
        type: "success",
      });
    } catch (error) {
      setMessage({
        text: `Upload failed. ${error.message || "Please try again."}`,
        type: "error",
      });
      console.error("Upload error:", error);
    } finally {
      setUploading((prev) => ({ ...prev, [type]: false }));
    }
  };

  const handlePdfDownload = async (type) => {
    const isPdfAvailable =
      type === "food" ? pdfAvailability.foodPdf : pdfAvailability.barPdf;

    if (!isPdfAvailable) {
      setMessage({
        text: `${
          type.charAt(0).toUpperCase() + type.slice(1)
        } menu is not available for download.`,
        type: "error",
      });
      return;
    }

    try {
      setDownloading((prev) => ({ ...prev, [type]: true }));
      await downloadPdf(type);
    } catch (error) {
      setMessage({
        text: `Download failed. ${error.message || "Please try again."}`,
        type: "error",
      });
    } finally {
      setDownloading((prev) => ({ ...prev, [type]: false }));
    }
  };

  const PdfCard = ({ title, currentPdf, pdfName, type }) => {
    const isPdfAvailable =
      type === "food" ? pdfAvailability.foodPdf : pdfAvailability.barPdf;

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl border border-gray-200">
        <h2 className="text-xl font-bold mb-6 text-[#324c22] border-b pb-4 flex items-center">
          <svg
            className="w-6 h-6 mr-3 text--[#324c22]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
          </svg>
          {title}
        </h2>

        <div className="flex flex-col space-y-8">
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-indigo-200 transition-colors">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center text-lg">
              <svg
                className="w-5 h-5 mr-2 text-[#324c22]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
              Current Menu
            </h3>

            {isPdfAvailable  ? (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <div className="flex-1 truncate text-sm text-gray-700 bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="truncate font-medium">
                      {currentPdf.filename || `${type}-menu.pdf`}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handlePdfDownload(type)}
                  disabled={downloading[type]}
                  className="bg-[#324c22] hover:bg-gray-900 text-white px-6 py-3 rounded-lg text-sm font-medium flex items-center justify-center transition-colors disabled:opacity-70 shadow-sm hover:shadow-md whitespace-nowrap"
                >
                  {downloading[type] ? (
                    <>
                      <svg
                        className="animate-spin w-4 h-4 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Downloading...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        ></path>
                      </svg>
                      Download PDF
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-24 bg-white rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <svg
                    className="mx-auto h-10 w-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                  <p className="mt-2 text-sm text-gray-500">
                    {fetching ? "Fetching PDF..." : "No current menu available"}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center text-lg">
              <svg
                className="w-5 h-5 mr-2 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              Upload New Menu
            </h3>

            <div className="mb-6 p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-green-200 transition-colors">
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <label className="flex-none flex items-center px-5 py-3 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 hover:border-green-300 transition-colors">
                    <svg
                      className="w-5 h-5 mr-2 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      ></path>
                    </svg>
                    <span className="text-sm font-medium text-gray-700">
                      Browse Files
                    </span>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handlePdfChange(e, type)}
                      className="hidden"
                    />
                  </label>

                  <div className="flex-1 truncate text-sm bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-700 shadow-sm">
                    <div className="flex items-center">
                      {pdfName !== "No file selected" ? (
                        <svg
                          className="w-5 h-5 mr-2 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 mr-2 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                      <span className="truncate">{pdfName}</span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-500 italic px-1">
                  Only PDF files are accepted. Maximum size: 25MB.
                </div>
              </div>
            </div>

            <button
              onClick={() => handleUpload(type)}
              className={`w-full flex justify-center items-center px-4 py-4 rounded-lg text-base font-medium transition-all ${
                pdfName !== "No file selected"
                  ? "bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              disabled={uploading[type] || pdfName === "No file selected"}
            >
              {uploading[type] ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Uploading Menu...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    ></path>
                  </svg>
                  Upload {title}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (!localStorage.getItem("admin_auth")) {
    return (
      <div className="h-dvh flex items-center justify-center bg-[#f8f5ed] p-6">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
          <div className="text-center mb-6 flex flex-col items-center ">
            <img
              src="/png/M-logo-11Dark.png"
              alt="Logo"
              className="w-12 h-12 self-center"
            />
            <h1 className="text-xl font-medium text-gray-800 mt-3">
              Admin Portal
            </h1>
          </div>

          {message.text && (
            <div
              className={`p-4 rounded-lg mb-6 flex items-center ${
                message.type === "error"
                  ? "bg-red-100 text-red-700"
                  : message.type === "info"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {message.type === "error" && (
                <svg
                  className="w-5 h-5 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              )}
              {message.type === "info" && (
                <svg
                  className="w-5 h-5 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              )}
              {message.type === "success" && (
                <svg
                  className="w-5 h-5 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              )}
              <span>{message.text}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    ></path>
                  </svg>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg transition-colors"
                  placeholder="Enter admin password"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#324c22] hover:bg-gray-900 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#324c22] flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                ></path>
              </svg>
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f5ed]">
      <div className="container mx-auto px-4 py-8">
        <div className="pb-6 md:pb-10">
          <div className="flex flex-row justify-between items-center ">
            <div className="flex items-center mb-0">
              <img
                src="/png/M-logo-11Dark.png"
                alt="Logo"
                className="w-12 h-12 mr-4"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-800 hidden md:block">
                  Marieta Admin
                </h1>
                <p className="text-gray-600 text-sm hidden md:block">
                  Upload and manage your restaurant menus
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>
              Logout
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PdfCard
            title="Food Menu"
            currentPdf={currentFoodPdf}
            pdfName={foodPdfName}
            type="food"
          />

          <PdfCard
            title="Bar Menu"
            currentPdf={currentBarPdf}
            pdfName={barPdfName}
            type="bar"
          />
        </div>

        {message.text && (
          <div
            className={`p-4 rounded-lg mt-6 flex items-center ${
              message.type === "error"
                ? "bg-red-100 text-red-700 border border-red-300"
                : message.type === "info"
                ? "bg-blue-100 text-blue-700 border border-blue-300"
                : "bg-green-100 text-green-700 border border-green-300"
            }`}
          >
            {message.type === "error" && (
              <svg
                className="w-5 h-5 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            )}
            {message.type === "info" && (
              <svg
                className="w-5 h-5 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            )}
            {message.type === "success" && (
              <svg
                className="w-5 h-5 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            )}
            <span>{message.text}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
