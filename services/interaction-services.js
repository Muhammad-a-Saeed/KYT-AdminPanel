import { API_ROUTES } from "@/config"
import fetcher from "./fetcher"


export const addNewInteraction = async ({ token, data }) => {
    return await fetcher({ method: "POST", path: API_ROUTES.INTERACTION.DEFAULT, data, headers: { authorization: token } })
}
export const fetchAllInteractions = async ({ token }) => {
    return await fetcher({ method: "GET", path: API_ROUTES.INTERACTION.DEFAULT, headers: { authorization: token } })
}