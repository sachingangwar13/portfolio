import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
  {
    name: String,
    artist: String,
    cover: String,
    audio: String,
    color: [String],
    jiosaavnId: String,
    status: String
  },
  { timestamps: true }
);

export default mongoose.model("Song", songSchema, "songsuggestions");
