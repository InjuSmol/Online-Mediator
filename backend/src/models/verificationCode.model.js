import mongoose from "mongoose";

const verificationCodeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["phone", "email"],
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    codeHash: {
      type: String,
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    attempts: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

/*
Automatically delete expired verification codes.
*/
verificationCodeSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

verificationCodeSchema.index({
  userId: 1,
  type: 1,
});

const VerificationCode = mongoose.model(
  "VerificationCode",
  verificationCodeSchema
);

export default VerificationCode;
