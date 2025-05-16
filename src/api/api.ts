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