import { model, Schema } from "mongoose";
import { ITour, ITourType } from "./tour.interface";

export const tourTypeSchema = new Schema<ITourType>({
    name: {
        type: String,
        required: true
    }

}, {
    versionKey: false,
    timestamps: true
})

export const TourType = model("TourType", tourTypeSchema)

const tourSchema = new Schema<ITour>({

    title: {
        type: String,
        required: true
    },

    slug: {
        type: String,
        required: true,
        unique: true
    },
    // images: {
    //     type: [String],
    //     default: []

    // },
    description: {
        type: String
    },
    included: {
        type: [String],
        default: []
    },
    excluded: {
        type: [String],
        default: []

    },
    costFrom: {
        type: Date,
    },
    startDate: {
        type: Date
    },

    endDate: {
        type: Date
    },
    amenities: {
        type: [String],
        default: []
    },
    maxGuest: {
        type: Number
    },
    minAge: {
        type: Number
    },
    division: {
        type: Schema.Types.ObjectId,
        ref: "Division"
    },
    location: {
        type: String
    },
    tourPlan: {
        type: [String]
    },
    tourType: {
        type: Schema.Types.ObjectId,
        ref: 'TourType'
    }



}, {
    versionKey: false,
    timestamps: true
})


tourSchema.pre("save", async function (next) {
    if (this.isModified("title")) {


        const baseSlug = this.title?.toLowerCase().split(" ").join("-")

        let slug = `${baseSlug}-division`

        console.log(slug)

        let count = 0;
        while (await Tour.exists({ slug })) {
            slug = `${slug}-${count++}`

        }

        this.slug = slug
    }

    next()
})
tourSchema.pre("findOneAndUpdate", async function (next) {
    const tour = this.getUpdate() as Partial<ITour>
    if (tour.title) {


        const baseSlug = tour.title?.toLowerCase().split(" ").join("-")

        let slug = `${baseSlug}-division`

        console.log(slug)

        let count = 0;
        while (await Tour.exists({ slug })) {
            slug = `${slug}-${count++}`

        }

        tour.slug = slug
    }

    next()
})

export const Tour = model<ITour>('Tour', tourSchema)