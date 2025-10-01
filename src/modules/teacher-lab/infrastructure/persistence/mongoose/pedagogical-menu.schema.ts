
import mongoose, { Schema, Document, Model } from 'mongoose';

const ActivitySchema = new Schema({
    start: { type: String, required: true },
    development: { type: String, required: true },
    closure: { type: String, required: true },
}, { _id: false });

const ApproachSchema = new Schema({
  title: { type: String, required: true },
  activities: { type: ActivitySchema, required: true },
  mbeJustification: { type: String, required: true },
  adaptationSuggestion: { type: String, required: true },
}, { _id: false });


const PedagogicalMenuSchema = new Schema({
    objective: { type: String, required: true },
    approaches: [ApproachSchema]
}, { timestamps: true });

export interface IPedagogicalMenuDocument extends Document {
    _id: mongoose.Types.ObjectId;
    objective: string;
    approaches: {
        title: string;
        activities: {
            start: string;
            development: string;
            closure: string;
        };
        mbeJustification: string;
        adaptationSuggestion: string;
    }[];
    createdAt: Date;
}

export function getPedagogicalMenuModel(): Model<IPedagogicalMenuDocument> {
    return mongoose.models.PedagogicalMenu || mongoose.model<IPedagogicalMenuDocument>('PedagogicalMenu', PedagogicalMenuSchema);
}
