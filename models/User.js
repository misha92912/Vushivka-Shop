import mongoose, {model, Schema, models} from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    surname:  { type: String, required: true },
    middlename:  { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    city: { type: String},
    postalCode: { type: String},
    streetAddress: { type: String},
    country: { type: String},
    orders: [{type: String}],
    cifralProds: [{type: String}],
    favorite: [{type: String}],
    dezignes: [{type: String}],
  },
  {
    timestamps: true,
  }
);

const User = models?.User || model('User', userSchema);
export default User;
