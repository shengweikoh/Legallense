import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}` || "http://localhost:8080/api";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

const geminiApi = {

    uploadContract: async(userId, contractFile, contractName) => {
        try {
            const formData = new FormData();
            formData.append("file", contractFile);
            formData.append("contractName", contractName)
            const response = await axiosInstance.post(`/users/${userId}/contracts/upload`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            );
            return {
                success:true,
                data: response.data
            };
        } 
        catch (error) {
            return {
                success: false,
                message: 
                    error.response?.data
            }
        }
    },

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

    highlightContract : async (userId, contractId) => {
        try {
            const response = await axiosInstance.post(
                `/users/${userId}/contracts/${contractId}/highlight`
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

    suggestContract : async (userId, contractId) => {
        try {
            const response = await axiosInstance.post(
                `/users/${userId}/contracts/${contractId}/suggest`
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