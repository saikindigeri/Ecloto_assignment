import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const dummyProducts = [
  { id: 1, name: "Iphone", price: 200 },
  { id: 2, name: "Samsung", price: 100 },
  { id: 3, name: "Vivo", price: 150 },
  { id: 4, name: "Oppo", price: 180 },
  { id: 5, name: "Redmi", price: 140 },
];

const GIFT_CARD = { id: 1000, name: "Gift card", price: 0, value: 1000 };
const threshold = 1000;

const App = () => {
  const [products, setProducts] = useState(dummyProducts);
  const [cart, setCart] = useState([]);

  const updateQuantity = (productId, value) => {
    //check whether the selected product is present in the products array or not
    const product = products.find((pro) => pro.id === productId);

    if (product.id === GIFT_CARD.id) {
      return;
    }

    setCart((prev) => {
      // checking if product is already present in the cart

      const item = prev.find((i) => i.id === product.id);
      // if item is present, updating the quantity
      if (item) {
        const newQuantity = Math.max(0, item.quantity + value);

        if (newQuantity === 0) {
          return prev.filter((i) => i.id !== product.id);
        }
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: newQuantity } : i
        );
      }
      // if value is greater than 0  in the cart intially, simple spreading the pre array of cart , updating a new item at the end
      if (value > 0) {
        return [...prev, { ...product, quantity: 1 }];
      }
      return prev;
    });
  };

  const addToCart = (productId) => {
    updateQuantity(productId, 1);
    toast.success("Item added to cart",
     
    );
   
  };

  // Calcutalting sub total
  const subTotal = cart.reduce(
    (sum, item) =>
      item.id !== GIFT_CARD.id ? sum + item.price * item.quantity : sum,
    0
  );

  // Removing item from the cart by comparing items which is not equal to current item.id
  const removeItem = (id) => {
    if (id !== GIFT_CARD.id) {
      setCart((prev) => prev.filter((item) => item.id !== id));
      toast.error("Item removed from the cart")
    }
  };

  useEffect(() => {
    // After dom mounted, checking if one of the items contains or acts as item which has the properly of GIFT_CARD.id
    const isGiftCard = cart.some((item) => item.id === GIFT_CARD.id);

    if (subTotal >= threshold && !isGiftCard) {
      setCart((prev) => [...prev, { ...GIFT_CARD, quantity: 1 }]);

      toast.success("Gift card added");
    } else if (subTotal < threshold && isGiftCard) {
      setCart((prev) => prev.filter((item) => item.id !== GIFT_CARD.id));
    }
  }, [cart, subTotal]);

  return (
    <div className="bg-gray-100 min-h-screen max-w-2xl mx-auto">
      <Toaster  position="top-right" />
      <div className="container mx-auto p-4">
        <h2 className="text-center font-semibold text-3xl font-serif">
          Products
        </h2>

        {/* Products Section */}
        <div className="bg-gray-100 text-black">
          <ul>
            {products.map((eachProduct) => {

              // Here to update the quantity simultenoulsy in cart and prodcts section, getting cart item present in the cart section.
              const cartItem = cart.find((item) => item.id === eachProduct.id);
              const quantity = cartItem ? cartItem.quantity : 0;
              return (
                <div
                  key={eachProduct.id}
                  className="grid grid-cols-3 space-x-4  border  text-black font-serif"
                >
                  <div className="text-left px-2">
                    <h3>{eachProduct.name}</h3>
                    <p>{eachProduct.price}</p>
                  </div>
                  <div className="justify-center">
                    <button
                      onClick={() => addToCart(eachProduct.id)}
                      className="bg-red-700 text-white p-3 rounded"
                    >
                      Add to Cart
                    </button>
                  </div>
                  <div className="flex items-center space-x-3 ">
                    <button className="bg-gray-400 h-5 w-5 rounded" onClick={() => updateQuantity(eachProduct.id, -1)}>
                      -
                    </button>
                    <span className="inline-block">{quantity}</span>
                    <button className="bg-gray-400 h-5 w-5 rounded" onClick={() => updateQuantity(eachProduct.id, 1)}>
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>

        {/* Cart Items section */}

        <div className="bg-gray-300 mt-3"> 
          <h2 className="text-3xl font-bold text-center font-serif">Cart</h2>
          <h2 className="font-bold text-2xl text-gray-600 -400 font-sans">
            Cart Total: ${subTotal}
          </h2>

          <div className="mb-4">
            <div className="w-full ">
              <div
                className="bg-green-600 h-10 rounded-full"
                style={{
                  width: `${Math.min((subTotal / threshold) * 100, 100)}%`,
                }}
              ></div>
              <p className="text-base font-semibold text-green-600 mt-1 text-center">
                {subTotal < threshold
                  ? `${threshold - subTotal}$ until gift card`
                  : "Gift card unlocked"}
              </p>
            </div>
          </div>

          {cart.length === 0 ? (
            <div>
              <h3>Cart is Empty</h3>
            </div>
          ) : (
            <div>
              <ul>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className={`flex justify-between items-center p-4 border rounded ${
                      item.id === GIFT_CARD.id ? "bg-green-300" : ""
                    }`}
                  >
                    {item.id !== GIFT_CARD.id ? (
                      <div>
                        <h2>{item.name}</h2>
                        <p>
                          ${item.price} x {item.quantity}= $
                          {item.price * item.quantity}
                        </p>
                        <div className="flex items-center space-x-3 ">
                          <button className="bg-gray-400 h-5 w-5 rounded" onClick={() => updateQuantity(item.id, -1)}>
                            -
                          </button>
                          <span className="inline-block">{item.quantity}</span>
                          <button className="bg-gray-400 h-5 w-5 rounded" onClick={() => updateQuantity(item.id, 1)}>
                            +
                          </button>
                        </div>

                        <button
                          className="text-white rounded-md bg-red-500 px-2"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <>
                        <div></div>
                        <div className="flex items-center space-x-3">
                          <span className="text-red-500 font-semibold">
                            {item.name} Value ${item.value * item.quantity}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
