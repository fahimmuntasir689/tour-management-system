import { Router } from "express";
import { tourController } from "./tour.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createTourZodSchema } from "./tour.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router()

// Tour Route

router.post('/create', validateRequest(createTourZodSchema), tourController.createTour)
router.get('/tours', checkAuth(...Object.values(Role)), tourController.getAllTour)
router.patch('/:id', checkAuth(...Object.values(Role)), validateRequest(createTourZodSchema), tourController.updateTour)
router.delete('/:id', checkAuth(...Object.values(Role)), tourController.deleteTour)

// Tour Type Route

router.post('/create-tour-type',  tourController.createTourType)
router.get('/tour-types', tourController.getAllTourTypes)
router.patch('/tour-types/:id', checkAuth(...Object.values(Role)), tourController.updateTourType)
router.delete('/tour-types/:id', checkAuth(...Object.values(Role)), tourController.deleteTourType)


export const tourRoutes = router