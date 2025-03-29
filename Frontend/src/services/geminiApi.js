import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

const geminiApi = {

    compareContracts: async (userId, contractId1, contractId2) => {
        try {
          const response = await axiosInstance.get(
            `/users/${userId}/contracts/compare`,
            { params: { contractId1, contractId2 } }
          );
          return {
            success: true,
            data: response.data
          };
        } catch (error) {
          return {
            success: false,
            message: error.response?.data || "An error occurred during comparison"
          };
        }
      },

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

    reviewContract : async (userId, contractId) => {
        try {
            const response = await axiosInstance.post(
                `/users/${userId}/contracts/${contractId}/review`
            );
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data || "An error occured while fetching the review"
            };
        }
    },

    // suggestContract : async (userId, contractId) => {
    //     try {
    //         const response = await axiosInstance.post(
    //             `/users/${userId}/contracts/${contractId}/suggest`
    //         );
    //         return {
    //             success: true,
    //             data: response.data,
    //         };
    //     } catch (error) {
    //         return {
    //             success: false,
    //             message:
    //                 error.response?.data || "An error occured while fetching the suggestions"
    //         };
    //     }
    // },



}

export default geminiApi;