import axios from "axios";

const BASE_URL = "http://localhost:8080/api/users";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

const geminiApi = {

    fetchHistoryContracts: async (userId) => {
        try {
            const response = await axiosInstance.get(
                `/${userId}/contracts`
            );
            return {
                success:true,
                data: response.data
            }
        } catch (error) {
            return {
                success:false,
                message: 
                    error.response?.data || "An error occured while fetching the contracts"
            }
        }
    },

    summariseContract: async (userId, contractId) => {
        try {
            const response = await axiosInstance.post(
                `/${userId}/contracts/${contractId}`
            );
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data || "An error occured while fetching the summary"
            };
        }
    },
}

export default geminiApi;