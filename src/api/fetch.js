import axiosInstance from "./axiosInstance";

export const authenticateAdmin = async (password) => {
  try {
    const response = await axiosInstance.post("/api/admin/login", { password });
    return response.data;
  } catch (error) {
    throw new Error("Authentication failed", error);
  }
};

export const uploadPdf = async (file, type) => {
  console.log(file, type, "file and type");

  try {
    if (!(file instanceof File)) {
      throw new Error("Invalid file provided.");
    }

    const formData = new FormData();
    const fieldName = type === "food" ? "foodPdf" : "barPdf";
    formData.append(fieldName, file, file.name);

    const response = await axiosInstance.post(`/api/menu/${type}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error uploading PDF:", error);
    throw error;
  }
};

export const downloadPdf = async (type) => {
  try {
    const response = await axiosInstance.get(`/api/menu/${type}/download`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type}_menu.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading PDF:", error);
    throw error;
  }
};

export const checkPdfAvailability = async () => {
  try {
    const response = await axiosInstance.get("/api/menu/check-pdfs");
    console.log("PDF Availability:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error checking PDF availability:", error);
    return { foodPdf: false, barPdf: false };
  }
};