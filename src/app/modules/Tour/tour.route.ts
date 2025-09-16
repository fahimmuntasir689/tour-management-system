import { Router } from "express";
import { tourController } from "./tour.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createTourZodSchema } from "./tour.validation";

const router = Router()

router.post('/create',  validateRequest(createTourZodSchema) , tourController.createTour)


export const tourRoutes = router