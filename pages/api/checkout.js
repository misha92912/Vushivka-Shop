import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import {Order} from "@/models/Order";

export default async function handler(req, res) {
  try {
    const {
        name, surname, middlename, email,
        phone, city, warehouse,
        delivery, payment, materialProductsIds, intangibleProductsIds
      } = req.body;
      await mongooseConnect();
      let productsIds = [];
      let type;
      if(materialProductsIds)  {productsIds = materialProductsIds; type='material';}
      if(intangibleProductsIds)  {productsIds = intangibleProductsIds; type='intangible'}
      const uniqueIds = [...new Set(productsIds)];
      const productsInfos = await Product.find({_id:uniqueIds});
    
      let line_items = [];
      for (const productId of uniqueIds) {
        const productInfo = productsInfos.find(p => p._id.toString() === productId);
        const quantity = productsIds.filter(id => id === productId)?.length || 0;
        if (quantity > 0 && productInfo) {
          line_items.push({
            product_id: productInfo._id,
            quantity,
            price_data: {
              currency: 'UAH',
              product_data: {name:productInfo.title},
              unit_amount: quantity * productInfo.price,
            },
          });
        }
      }
    
      const orderDoc = await Order.create({
        line_items, name, surname, middlename, email,
        phone, city, warehouse,
        delivery, payment,
        paid:false,
        delivered:false,userId:'unregister',type: type,
      });
      let session = {};
      if(materialProductsIds) session = {url: process.env.PUBLIC_URL + '/cart?success',}
      if(intangibleProductsIds) session = {url: process.env.PUBLIC_URL + '/cart?added',}
    res.status(200).json({url:session.url, orderDoc})
  } catch (err) {
    res.status(500).json({url:session.url, orderDoc})
  }
}