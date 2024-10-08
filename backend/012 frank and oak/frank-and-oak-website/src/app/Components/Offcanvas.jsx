import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoLockClosedOutline } from "react-icons/io5";
import PopularOffcanvasCards from "./PopularOffcanvasCards";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { deleteProductFromCart } from "../redux/slices/cartSlice";
// import { useEffect } from "react/cjs/react.production.min";

const Offcanvas = ({ close }) => {
  const [controlBtn, setControlBtn] = useState(false);
  const [cartProducts, setCartProduct] = useState([]);
  const [filePath, setFilePath] = useState('');
  const [cartDetails, setCartDetails] = useState({ totalQ: 0, totalPrice: 0 });

  const cartData = useSelector((state) => (state.cart.value));
  const products = useSelector((state) => (state.products.value));

  const dispatch = useDispatch();

  console.log('abc:', products);

  useEffect(() => {
    setCartProduct(cartData);
    setFilePath(products.filepath);
  }, [cartData])
  console.log('cartdata', cartData);

  useEffect(() => {
    let totalItem = 0;
    let totalprice = 0;
    cartProducts.forEach((cartItem) => {
      totalItem += cartItem.quantity

      totalprice += (cartItem.quantity * cartItem.product.price);
    });

    console.log('totalprice', totalprice);
    setCartDetails({ totalQ: totalItem, totalPrice: totalprice });
    // setCartDetails({totalPrice:totalprice, totalQ:totalItem});

  }, [cartProducts]);

  const handlePrevBtn = () => {
    const box = window.document.querySelector("#box");
    const width = box.clientWidth;
    box.scrollLeft -= width;
    if (box.scrollLeft === 0 || box.scrollLeft < width) setControlBtn(false);
  };
  const handleNextBtn = () => {
    const box = window.document.querySelector("#box");
    const width = box.clientWidth;
    box.scrollLeft += width;
    setControlBtn(true);
  };

  const handleDeletedProduct = async(e)=>{
    console.log(e.target.value);

   

    axios.delete(`${process.env.NEXT_PUBLIC_URL}/frank-and-oak-services/cart/delete-product/${e.target.value}`)
    .then((response)=>{
      console.log(response);
      dispatch(deleteProductFromCart(e.target.value));
    })
    .catch((error)=>{
      console.log(error);
    })
  };

  const hanldeUpdateQuentity = async (e)=>{
    console.log(e.target.value, e.target.textContent);

    const dataFound = cartProducts.filter((cartItem)=> cartItem._id === e.target.value);

    console.log(dataFound[0].quantity);
  }

  return (
    <div className="w-[600px] h-[100vh] absolute right-0 top-0 bg-white">
      <span className="block h-[40px] px-[10px] bg-[#f9f9f9]">
        <FaArrowLeft
          className="inline-block cursor-pointer mr-[20px] h-full text-[12px] font-thin"
          onClick={() => close(false)}
        />
        <span className="text-[14px]">Continue Shopping</span>
      </span>
      <span className="block bg-black text-white text-center text-[12px] h-[30px] py-[5px] box-border font-[500]">
        Free shipping on orders $99+ and free returns
      </span>

      {/* <div className="w-full my-[50px] relative">
        <span className="block bg-[#f9f9f9] h-[40px] p-[8px_30px]">
          Most popular right now
        </span>
        <div
          className="w-full px-[20px] h-[30vh] overflow-hidden scroll-smooth mx-auto mt-[10px] grid grid-flow-col gap-[50px]"
          id="box"
        >
          <FaArrowLeft
            className={`absolute top-[50%] w-[30px] h-[30px] font-thin p-[5px] rounded-[50%] z-50 text-[#303640] bg-white left-[10px] shadow-lg cursor-pointer ${
              controlBtn ? "flex" : "hidden"
            }`}
            onClick={handlePrevBtn}
          />
          <FaArrowRight
            className="absolute top-[50%] w-[30px] h-[30px] font-thin p-[5px] rounded-[50%] z-50 text-[#303640] bg-white right-[10px] shadow-lg cursor-pointer"
            onClick={handleNextBtn}
          />
          <PopularOffcanvasCards
            img={"/JITIMG1.jpg"}
            content={"The SeaCell™ Crewneck Cardigan in Dark Chocolate"}
            price={"$149"}
            sizes={["XXS", "XS", "S", "M", "L", "XL"]}
          />

          <PopularOffcanvasCards
            img={"/JITIMG2.webp"}
            content={"The Zip Up Bomber Jacket in Light Beige"}
            price={"$149"}
            sizes={["XXS", "XS", "S", "M", "L", "XL"]}
          />
          <PopularOffcanvasCards
            img={"/JITIMG3.webp"}
            content={"The Button-Up Sweater Vest in Space Blue"}
            price={"$89.50"}
            sizes={["XXS", "XS", "S", "M", "L", "XL"]}
          />
          <PopularOffcanvasCards
            img={"/JITIMG.webp"}
            content={"The French Terry Overshirt in Coronet Blue"}
            price={"$79.99"}
            sizes={["XXS", "XS", "S", "M", "L", "XL"]}
          />
          <PopularOffcanvasCards
            img={"/JITIMG4.webp"}
            content={"The Fluid Camp Collar Blouse in White"}
            price={"$79.50"}
            sizes={["XXS", "XS", "S", "M", "L", "XL"]}
          />
        </div>
      </div> */}

      <div>
        {
          cartProducts.map((product) => (
            <div className='grid grid-cols-[2fr_6fr_2fr_2fr]'>
              <div>
                <img className='w-full' src={filePath + product.product.thumbnail} />
              </div>
              <div>
                <h2 className='text-[#303640]'>{product.product.name}</h2>
              </div>

              <div>
                <h2 className='text-[#303640]'> <span>₹</span> {product.product.price}</h2>
              </div>
              <div>
                <button value={product._id} disabled={product.quantity === 1} className='border p-1'>-</button>
                <span className='mx-2'>
                {
                  product.quantity
                }
                </span>
                <button value={product._id} onClick={hanldeUpdateQuentity} className='border p-1'>+</button>
                <button value={product._id} onClick={handleDeletedProduct} className='border p-1'>Delete</button>
              </div>
            </div>
          ))
        }
      </div>
      <div className="w-[90%] absolute bottom-[10px] left-[50%] translate-x-[-50%] ">
        <div className="w-full bg-[#f9f9f9] h-[40px] flex items-center justify-between mb-[10px] px-[10px]">
          <span>
            Subtotal <span className="text-[#7c7c7c]">({cartDetails.totalQ} items)</span>
          </span>
          <span>₹ {cartDetails.totalPrice}</span>
        </div>
        <button className="flex gap-[20px] items-center justify-center text-white text-[20px] w-full h-[60px] cursor-pointer bg-[#7c7c7c] ">
          <span>Secure Checkout AAAA</span>
          <IoLockClosedOutline className="inline-block" />
        </button>
      </div>
    </div>
  );
};

export default Offcanvas;
