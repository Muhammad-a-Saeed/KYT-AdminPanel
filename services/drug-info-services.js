import { API_ROUTES } from "@/config"
import fetcher from "./fetcher"

export const getAllDrugs = async (token) => {
    return await fetcher({ method: "GET", path: "drug-information/", headers: { authorization: token } })
}
export const addNewDrug = async (token, data) => {
    return await fetcher({ method: "POST", path: API_ROUTES.ADD_NEW_DRUG, data, headers: { authorization: token } })
}