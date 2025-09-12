/* eslint-disable @typescript-eslint/no-explicit-any */
import passport, { Profile } from "passport";
import { Strategy as GoogleStrategy, VerifyCallback } from "passport-google-oauth20";
import { envVars } from "../../../env";
import { User } from "../modules/user/user.model";
import { Role } from "../modules/user/user.interface";
import { Strategy as LocalStrategy } from "passport-local";
import bcryptjs from "bcryptjs"




// passport middleware for login authentication

passport.use(       // Methods are functions stored as object properties.
    new LocalStrategy({

        usernameField: "email",
        passwordField: "password"

    }, async (email: string, password: string, done) => {

        try {

           

            const isUserExist = await User.findOne({ email })
           
            if (!isUserExist) {
            
                return done( "user doesn't exist" )
            }

            const isGoogleAuthenticated = isUserExist.auths.some(providerObj => providerObj.provider === 'google')
             

            if (isGoogleAuthenticated && !isUserExist.password) {
                return done('you have logged in through Google auth system.if you want to login with credential at first login with google set a password.')
            }

    


            const isPasswordMatch = await bcryptjs.compare(password, isUserExist.password as string)

            if (!isPasswordMatch) {
                return done(null, false, { message: "password doesn't match" })
            }
             console.log('done')

            return done(null, isUserExist)
           



        } catch (error) {
            console.log(error)
            done(error)
        }

    }))

// passport middleware for google authentication

passport.use(
    new GoogleStrategy({
        clientID: envVars.GOOGLE_CLIENT_ID,
        clientSecret: envVars.GOOGLE_CLIENT_SECRET,
        callbackURL: envVars.GOOGLE_CALLBACK_URL
    },
        async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
            try {

                const email = profile.emails?.[0].value;

                if (!email) {
                    return done(null, false, {
                        message: 'email pawa jay nai'
                    })
                }

                let user = await User.findOne({ email })
                if (!user) {
                    user = User.create({
                        email,
                        name: profile.displayName,
                        picture: profile.photos?.[0].value,
                        role: Role.USER,
                        isVerified: true,
                        auths: [
                            {
                                provider: "google",
                                providerId: profile.id
                            }
                        ]
                    })
                }
                return done(null, user)

            } catch (error) {
                console.log(error)
                return done(error)

            }
        })
)

passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
    done(null, user._id)
})

passport.deserializeUser(async (id: string, done: any) => {
    try {
        const user = User.findById(id)
        done(null, user)
    } catch (error) {
        console.log(error)

    }

})
