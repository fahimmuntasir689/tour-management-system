import { Router } from "express";
import { userControllers } from "./user.controller";
import { createUserZodSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "./user.interface";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router()

router.post("/register", validateRequest(createUserZodSchema), userControllers.createUser)

router.get("/all-users", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), userControllers.returnAllUser)

router.patch("/:id", checkAuth(...Object.values(Role)), userControllers.updateUser)

export const userRoutes = router