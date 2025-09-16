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

export const Tour = model<ITour>('Tour', tourSchema)