import {model, models, Schema} from "mongoose";

const OrderSchema = new Schema({
  line_items: Object,
  name: String,
  surname: String,
  middlename: String,
  email: String,
  phone: String,
  city: String,
  warehouse: String,
  delivered: Boolean,
  payment: String,
  paid: Boolean,
  userId: String,
  type: String
}, {
  timestamps: true,
});

export const Order = models?.Order || model('Order', OrderSchema);