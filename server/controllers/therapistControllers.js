
import User from "../models/userModel.js";

export const getTherapists = async (req, res) => {
    try{
        const therapists = await User.find({type:'therapist'});
        res.status(200).json(therapists);
    }catch(error){
        res.status(500).json({error:error});
    }
}
