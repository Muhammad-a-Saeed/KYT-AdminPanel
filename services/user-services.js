import { API_ROUTES } from "@/config"
import fetcher from "./fetcher"



export const getAllUsers = async ({ token }) => {
    return await fetcher({ method: "GET", path: API_ROUTES.USER, headers: { authorization: token } })
}
export const deleteUserById = async ({ token, id }) => {
    return await fetcher({ method: "DELETE", path: `${API_ROUTES.USER.DELETE}${id}`, headers: { authorization: token }, })
}
export const getAllTransaction = async ({ token }) => {
    return await fetcher({ method: "GET", path: API_ROUTES.TRANSACTION, headers: { authorization: token } })
}
export const getAllBooking = async ({ token }) => {
    console.log(token, "bookingtoken")
    return await fetcher({ method: "GET", path: API_ROUTES.BOOKING, headers: { authorization: token } })
}