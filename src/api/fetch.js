import axiosInstance from "./axiosInstance";

export const authenticateAdmin = async (password) => {
  try {
    const response = await axiosInstance.post("/api/admin/login", { password });
    return response.data;
  } catch (error) {
    throw new Error("Authentication failed", error);
  }
};

export const getPDF1 = async () => {
  try {
    const response = await axiosInstance.get("/api/menu/food/info");
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { url: "", filename: "" };
    }
    throw new Error("Failed to fetch food menu", error);
  }
};

export const getPDF2 = async () => {
  try {
    const response = await axiosInstance.get("/api/menu/bar/info");
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { url: "", filename: "" };
    }
    throw new Error("Failed to fetch bar menu", error);
  }
};

export const updatePDF1 = async (formData) => {
  try {
    const response = await axiosInstance.post("/api/menu/food", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to update food menu", error);
  }
};

export const updatePDF2 = async (formData) => {
  try {
    const response = await axiosInstance.post("/api/menu/bar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to update bar menu", error);
  }
};

export const downloadPDF1 = async () => {
  try {
    const response = await axiosInstance.get("/api/menu/food/download", {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "food_menu.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    throw new Error("Failed to download food menu", error);
  }
};

export const downloadPDF2 = async () => {
  try {
    const response = await axiosInstance.get("/api/menu/bar/download", {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "bar_menu.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    throw new Error("Failed to download bar menu", error);
  }
};
