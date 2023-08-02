import {mongooseConnect} from "@/lib/mongoose";
import {Order} from "@/models/Order";

export default async function handler(req,res) {
  const {method} = req;
  await mongooseConnect();
  
  if (method === 'GET') {
    res.json(await Order.find().sort({createdAt:-1}));
  }

  if (method === 'PUT') {
      const {delivered, paid, _id} = req.body;
      await Order.updateOne({_id}, {delivered, paid})
      res.json(true);
  }
  
  if (method === 'DELETE') {
    if (req.query?._id) {
      await Order.deleteOne({_id:req.query?._id});
      res.json(true);
    }
  }
 
}