import axios from "axios"

export const getAnime = async (page, query) => {
    const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}anime?q=${query}&limit=24&page=${page}&rating=pg`
        )
    return res.data
}