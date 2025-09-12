import { Router } from "express";
import { divisionController } from "./division.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createDivisionZodSchema } from "../user/user.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router()


router.post('/create', checkAuth(...Object.values(Role)), validateRequest(createDivisionZodSchema), divisionController.createDivision)

router.get('/', checkAuth(...Object.values(Role)), divisionController.getAllDivision)
router.patch('/:id', checkAuth(...Object.values(Role)), divisionController.updateDivision)
router.delete('/:id', checkAuth(...Object.values(Role)), divisionController.deleteDivision)

export const divisionRoutes = router