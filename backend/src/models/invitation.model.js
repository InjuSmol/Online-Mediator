import mongoose from "mongoose";

const invitationSchema = new mongoose.Schema(
  {
    inviterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    inviteeUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    inviteeEmail: {
      type: String,
      lowercase: true,
      trim: true,
      default: null,
    },

    inviteePhone: {
      type: String,
      trim: true,
      default: null,
    },

    tokenHash: {
      type: String,
      required: true,
      unique: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "declined",
        "cancelled",
        "expired",
      ],
      default: "pending",
    },

    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      default: null,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    acceptedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

invitationSchema.index({
  inviteeEmail: 1,
  status: 1,
});

invitationSchema.index({
  inviteePhone: 1,
  status: 1,
});

const Invitation = mongoose.model("Invitation", invitationSchema);

export default Invitation;
