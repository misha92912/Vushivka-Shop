import {mongooseConnect} from "@/lib/mongoose";
import User from "@/models/User";

export default async function handle(req,res) {
  await mongooseConnect();
  res.json(await User.find());
}