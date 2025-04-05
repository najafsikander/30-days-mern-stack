import {Schema,model} from 'mongoose';

export interface IRating {
    rating:number;
    remark:string;
    userId: Schema.Types.ObjectId
};

const ratingSchema = new Schema<IRating>({
    rating:{type:Number, required:true},
    remark:{type:String, required:true},
    userId:{type:Schema.Types.ObjectId, ref:'User', required:true}
},
{
    timestamps:true
});

const Rating = model<IRating>('Rating', ratingSchema);
export default Rating;