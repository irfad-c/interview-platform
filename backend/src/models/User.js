import mongooose from "mongoose";

const userSchema = new mongooose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: { type: String, required: true, unique: true },
    profileImage: {
      type: String,
      default: "",
    },
    clerkId:{
      type:String,
      required:true,
      unique:true
    }
  },
  {
    timestamps: true,
  }
);

const User = mongooose.model("User", userSchema);

export default User;