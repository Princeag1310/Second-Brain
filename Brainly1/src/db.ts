
// create user models and schemas here

import mongoose, { Schema, model } from 'mongoose';

mongoose.connect(process.env.MONGO_URI || "mongodb+srv://princeagrawal1013:Prince%401234@prince-agrawal.pzlfdls.mongodb.net/brainly")

const UserSchema = new Schema({
    username: {type: String, unique: true},
    password: String
})

export const UserModel = model("User", UserSchema);

const contentSchema = new Schema({
    title: String,
    link: String,
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    type: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true}
})

export const ContentModel =  model("Content", contentSchema);

const linkSchema = new Schema({
    hash: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true}
})

export const LinkModel = model("Links", linkSchema)

