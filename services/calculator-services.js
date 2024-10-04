import { API_ROUTES } from "@/config"
import fetcher from "./fetcher"



export const calculateCreatinine = async ({ token, data }) => {
    return await fetcher({ method: "POST", path: API_ROUTES.CALCULATOR.CREATININE, data, headers: { authorization: token } })
}
export const calculateSodium = async ({ token, data }) => {
    return await fetcher({ method: "POST", path: API_ROUTES.CALCULATOR.SODIUM, data, headers: { authorization: token } })
}