import { API_ROUTES } from "@/config"
import fetcher from "./fetcher"

export const fetchSearchResults = async ({ token, searchVal }) => {
    return await fetcher({
        method: "GET", path: API_ROUTES.DASHBOARD.SEARCH_BY_NAME + searchVal, headers: { authorization: token }
    })
}