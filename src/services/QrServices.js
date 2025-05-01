import axios from "axios";

export const createQrCode = async (data) => {
  try {
    const response = await axios.post(
      "https://api.vietqr.io/v2/generate",
      data
    );
    return response;
  } catch (error) {
    console.error("Error creating QR code:", error);
    throw error;
  }
};
