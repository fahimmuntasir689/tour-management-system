
import { ITour } from "./tour.interface"
import { Tour } from "./tour.model"

const createTour = async (payload: ITour) => {

    const tour = await Tour.create(payload)

    return tour
}
const getAllTour = () => {
    return "get All Tour from Tour Services"
}
const updateTour = () => {
    return "update Tour from Tour Services"
}

export const tourServices = {
    createTour, getAllTour, updateTour
}