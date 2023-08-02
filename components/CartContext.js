import {createContext, useEffect, useState} from "react";

export const CartContext = createContext({});

export function CartContextProvider({children}) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts,setCartProducts] = useState([]);
  const [userMail, setUserMail] = useState('');
  const [userId, setUserId] = useState('');
  const [query, setQuery] = useState('');
  
  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')));
    }
  }, []);

  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem('cart', JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  function addProduct(productId) {
    setCartProducts(prev => [...prev,productId]);
  };
  function addCifralProduct(productId) {
    if (cartProducts.includes(productId)) return;
    setCartProducts(prev => [...prev,productId]);
  };
  function removeProduct(productId) {
    setCartProducts(prev => {
      const pos = prev.indexOf(productId);
      if (pos === 0 && cartProducts.length === 1) {
        ls?.setItem('cart', []);
        return prev.filter((value,index) => index !== pos);
      }
      if (pos !== -1) {
        return prev.filter((value,index) => index !== pos);
      }
      return prev;
    });
  }

  function clearCart(ids) {
    if(ids) {
      ids.forEach( id => removeProduct(id) )
    } else
    setCartProducts([]);
    ls?.setItem('cart', []);
  }
  return (
    <CartContext.Provider value={{ query, setQuery, cartProducts, setCartProducts, 
                                  addProduct, addCifralProduct, removeProduct, clearCart, 
                                  userMail, setUserMail, userId, setUserId }}>
      {children}
    </CartContext.Provider>
  );
}