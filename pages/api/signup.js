import {mongooseConnect} from "@/lib/mongoose";
import {User} from "@/models/User";


export default async function handle(req,res){
  const email = req.body.email;
  await mongooseConnect(); 
  res.json(await User.find());
}