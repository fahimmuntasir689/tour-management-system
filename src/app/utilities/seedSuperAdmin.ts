import { envVars } from "../../../env"
import { AppError } from "../ErrorHelper/AppError"
import { IAuthProvider, IUser, Role } from "../modules/user/user.interface"
import { User } from "../modules/user/user.model"
import bcrypt from 'bcryptjs'

export const seedSuperAdmin = async () => {

    try {

        const isSuperAdminExist = await User.findOne({ email: envVars.SUPER_ADMIN_EMAIL })

        if (isSuperAdminExist) {
            // console.log('super admin already exist')
            return

        }

        const hashedPass = await bcrypt.hash(envVars.SUPER_ADMIN_PASS, Number(envVars.BCRYPT_SALTING))

        const authProvider: IAuthProvider = {
            provider: 'credentials',
            providerId: envVars.SUPER_ADMIN_EMAIL
        }

        const payload: Partial<IUser> = {
            name: 'super admin',
            email: envVars.SUPER_ADMIN_EMAIL,
            role: Role.SUPER_ADMIN,
            password: hashedPass,
            auths: [authProvider],
            isVerified: true
        }


        const superAdmin = await User.create(payload)


    } catch (error) {

        throw new AppError(400, 'super admin ey jhamela hoise')


    }

}
