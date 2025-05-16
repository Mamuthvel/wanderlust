
import zustandStore from "@/store";
import axiosInstance from "@/utils/axiosInstance"
import URLs from "@/utils/url"
import { AxiosResponse } from "axios";
import { Payload } from "recharts/types/component/DefaultLegendContent";

export const register = async (payload) => {
    try {
        const result = await axiosInstance.post(URLs.Register, payload);
        return result
    } catch (error) {
        console.error("Error while making register api call")
    }
}

export const login = async (payload) => {
    try {
        const result = await axiosInstance.post(URLs.Login, payload);
        console.log(result, 'res');
        localStorage.setItem('token', result.data.token);
        zustandStore.getState().setIsAuthenticated(true);
        return result
    } catch (error) {
        console.error("Error while making login api call")
    }
}

export const bookRoom = async (bookingDetails) => {
    try {
        // In a real implementation, this would make an API call to your booking service
        // For now, we'll just mock a successful booking response
        console.log("Booking details submitted:", bookingDetails);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return {
            success: true,
            bookingId: `BOOK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            message: "Booking successful!"
        };
    } catch (error) {
        console.error("Error while making booking api call", error);
        return {
            success: false,
            message: "Failed to complete booking. Please try again."
        };
    }
}
