import React from 'react';

import uuid from 'react-uuid';

export const CartContext = React.createContext();

export const CartStorage = ({children}) => {

  const [count, setCount] = React.useState(0);
  const [products, setProducts] = React.useState([]);

  async function getCart() {
    return await JSON.parse(window.localStorage.getItem('cart'));
  }

  async function save(cart) {
    window.localStorage.setItem('cart', JSON.stringify(cart));
    let {products} = await getCart(cart);
    setCount(await getCount());
    setProducts(products);
  }

  async function clearAll() {
    try {
      let local = { products: [], length: 0 };
      await save(local);
      return true;
    } catch(err) {
      console.log(err);
      return false;
    }
  }

  function addProduct(product, count) {
    product.carId = uuid();
    getCart().then( async (cart) => {
      const newCart = { products: [...cart.products, {product, count}], length: cart.products.length + 1 };
      await save(newCart);
    })
  }

  async function updateCountProduct({product, count}) {
    try {
      let { products } = await getCart();

      if (products) {
        products.map((item, index) => {
          if (item.product.carId === product.carId) {
            item.count = count;
            products[index] = item;
          }
        });
        await save({products, length: products.length});
      }
    } catch (err) {
      console.log('Erro ao remover produto: ', err);
    }
  }

  async function removeProduct(carId) {
    try {
      let { products } = await getCart();

      if (products) {
        products.map((item, index) => {
          if (item.product.carId === carId) {
            products.splice(index, 1);
          }
        });
        await save({products, length: products.length});
      }
    } catch (err) {
      console.log('Erro ao remover produto: ', err);
    }
  }

  async function getTotal() {
    let { products } = await getCart();

    if (!products) return 0;

    if (products.length > 1) {
      let vTotal = 0;
      products.forEach(({product, count}) => {
        vTotal += (product.price * count);
      });
      return vTotal;
    } else if (products.length === 1) {
      return products[0].product.price * products[0].count;
    } else {
      return 0;
    }
  }

  function getCountProducts(products) {
    if (products.length > 1) {
      let vCount = 0;
      products.forEach(({count}) => {
        vCount += count;
      });
      return vCount;
    } else if (products.length == 1 ) {
      return products[0].count;
    } else {
      return 0;
    }
  }

  async function getCount() {
    let { products } = await getCart();
    if (!products) return 0;
    return getCountProducts(products);
  }

  React.useEffect(() => {
    let local = window.localStorage.getItem('cart');
    if (local) {
      if (!local.products && !local.length) {
        window.localStorage.removeItem('cart');
        local = { products: [], length: 0 };
        window.localStorage.setItem('cart', JSON.stringify(local));
      }

      setCount(getCountProducts(JSON.parse(local).products));
      setProducts(JSON.parse(local).products);
    } else {
      local = { products: [], length: 0 };
      window.localStorage.setItem('cart', JSON.stringify(local));
    }
  }, []);

  return <CartContext.Provider value={ {clearAll, getCart, count, products, addProduct, removeProduct, updateCountProduct, getTotal, getCount} }>
    {children}
  </CartContext.Provider>

} 