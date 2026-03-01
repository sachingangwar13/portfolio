import mongoose from "mongoose";

const { Schema } = mongoose;

const SongSuggestionSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Song name is required"],
      trim: true,
    },
    artist: {
      type: String,
      required: [true, "Artist name is required"],
      trim: true,
    },
    cover: {
      type: String,
      required: [true, "Cover image URL is required"],
    },
    audio: {
      type: String,
      required: [true, "Audio URL is required"],
    },
    color: {
      type: [String],
      required: true,
    },
    jiosaavnId: {
      type: String,
      required: false,
    },
    count: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const SongSuggestion =
  mongoose.models.SongSuggestion ||
  mongoose.model("SongSuggestion", SongSuggestionSchema);

export default SongSuggestion;