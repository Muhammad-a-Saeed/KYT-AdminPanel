import { API_ROUTES } from "@/config"
import fetcher from "./fetcher"



export const addNewIV = async ({ token, data }) => {
    return await fetcher({ method: "POST", path: API_ROUTES.IV.ADD, data, headers: { authorization: token } })
}
export const getNewIv = async ({ token }) => {
    return await fetcher({ method: "GET", path: API_ROUTES.IV.GET, headers: { authorization: token } })
}