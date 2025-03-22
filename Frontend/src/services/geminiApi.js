import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;

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
                `/users/${userId}/contracts`
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

    fetchContractDetails: async (userId, contractId) => {
        try {
            const response = await axiosInstance.get(
                `/users/${userId}/contracts/${contractId}`
            );
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            return {
                success: false,
                message:
                error.response?.data || "An error occured while fetching the contract details"
            }
        }
    },

    summariseContract: async (userId, contractId) => {
        try {
            const response = await axiosInstance.post(
                `/users/${userId}/contracts/${contractId}/summarize`
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