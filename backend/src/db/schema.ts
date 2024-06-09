import mongoose from "mongoose";

const schema = new mongoose.Schema({
    roomId:{
        type: String,
        required: true
    },
    users:[
        {
            usersName: String
        }
    ],
    documentTitle:{
        type: String,
    },
    documentContent:{
        type: String
    },
    roomName:{
        type: String,
    }
});

const Data = mongoose.model("data", schema);

export default Data;