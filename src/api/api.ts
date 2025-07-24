
import zustandStore from "@/store";
import axiosInstance from "@/utils/axiosInstance"
import URLs from "@/utils/url"
import { error } from "console";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface BookingDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  paymentMethod: string;
  room: string;
  roomId: number;
  nights: number;
  totalPrice: number;
  startDate?: Date;
  endDate?: Date;
  guestCount: number;
}

export interface BookingResponse {
  success: boolean;
  bookingId?: string;
  message: string;
}

export const register = async (payload: RegisterPayload) => {
  try {
    const result = await axiosInstance.post(URLs.Register, payload);
    return result;
  } catch (error) {
    console.error("Error while making register api call");
  }
}

export const login = async (payload: LoginPayload) => {
  try {
    const result = await axiosInstance.post(URLs.Login, payload);
    localStorage.setItem('token', result.data.token);
    zustandStore.getState().setIsAuthenticated(true);
    return result;
  } catch (error) {
    console.error("Error while making login api call");
  }
}

export const getDestination = async ({
  search = "",
  location = "",
  checkIn = "",
  checkOut = "",
  guests = {}
}: {
  search?: string;
  location?: string;
  checkIn?: string | Date;
  checkOut?: string | Date;
  guests?: {
    adults?: number;
    children?: number;
    rooms?: number;
  };
} = {}) => {
  try {
    const queryParams = new URLSearchParams();

    if (location) queryParams.append("search", location);
    if (checkIn) queryParams.append("checkIn", checkIn.toString());
    if (checkOut) queryParams.append("checkOut", checkOut.toString());
    if (guests?.adults && guests?.adults > 1) queryParams.append("adults", guests.adults.toString());
    if (guests?.children) queryParams.append("children", guests.children.toString());
    if (guests?.rooms && guests?.rooms > 1) queryParams.append("rooms", guests.rooms.toString());

    const queryString = queryParams.toString();
    const url = `${URLs.GetDestination}${queryString ? `?${queryString}` : ""}`;

    const result = await axiosInstance.get(url);
    return result.data;
  } catch (error) {
    console.error("Error while calling getDestination:", error);
    return [];
  }
};
export const getProperty = async ({
  start,
  end,
  guests,
  minPrice = 0,
  maxPrice = 1200,
  type,
  sort = "recommended"
}: any = {}) => {
  try {
    const queryParams = new URLSearchParams();

    if (start) queryParams.append("start", start);
    if (end) queryParams.append("end", end.toString());
    if (minPrice) queryParams.append("minPrice", minPrice.toString());
    if (maxPrice) queryParams.append("maxPrice", maxPrice.toString());
    if (type) queryParams.append("type", type.toString());
    if (sort) queryParams.append("sort", sort.toString());
    if (guests?.adults && guests?.adults > 1) queryParams.append("adults", guests.adults.toString());
    if (guests?.children) queryParams.append("children", guests.children.toString());
    if (guests?.rooms && guests?.rooms > 1) queryParams.append("rooms", guests.rooms.toString());

    const queryString = queryParams.toString();
    const url = `${URLs.GetProperty}${queryString ? `?${queryString}` : ""}`;

    const result = await axiosInstance.get(url);
    return result.data;
  } catch (error) {
    console.error("Error while calling getProperty:", error);
    return [];
  }
};
export const getRoomsFromProperty = async ({ propertyId, guests = 2, start, end }: any = {}) => {
  try {
    if (!propertyId) throw new Error(" Property ID is required.");
    if (!guests) throw new Error(" Guests count is required.");
    const queryParams = new URLSearchParams();

    if (start) queryParams.append("start", start);
    if (end) queryParams.append("end", end.toString());
    const url = URLs.GetRoomsFromProperty(propertyId);

    const params = {
      guests,
      ...(start && { start }),
      ...(end && { end })
    };

    const result = await axiosInstance.get(url, { params });
    return result?.data?.rooms;
  } catch (error) {
    console.error(" getRoomsFromProperty error:", error.response?.data || error.message);
    throw error;
  }
};

