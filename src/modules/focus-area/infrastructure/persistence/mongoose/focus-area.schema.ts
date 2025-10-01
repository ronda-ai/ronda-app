
import mongoose, { Schema, Document, Model } from 'mongoose';

const FocusAreaSchema = new Schema({
    name: { type: String, required: true, unique: true },
}, { timestamps: true });

export interface IFocusAreaDocument extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
}

const FocusAreaModel: Model<IFocusAreaDocument> = mongoose.models.FocusArea || mongoose.model<IFocusAreaDocument>('FocusArea', FocusAreaSchema);

export default FocusAreaModel;
