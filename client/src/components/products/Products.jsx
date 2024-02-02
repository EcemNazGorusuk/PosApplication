import React, { useEffect, useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import AddProduct from "./AddProduct";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../redux/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";
export default function Products({
  allCategories,
  allProducts,
  setAllProducts,
  filteredCategory,
  search,
}) {
  //redux addProduct
  const cart = useSelector((state) => state.cart);
  console.log(" `cart:` ", cart.cartItems);

  const dispatch = useDispatch();

  const handleClick = (product) => {
    dispatch(addProduct({ ...product, quantity: 1 })); //dispatch içinde reducerlara erişilir
    message.success("Ürün Sepete Eklendi.");
  };

  //onclick & navigate
  const navigate = useNavigate();

  const [isPlusModalOpen, setIsPlusModalOpen] = useState(false);
  const showPlusModal = () => {
    setIsPlusModalOpen(true);
  };
  const handlePlusCancel = () => {
    setIsPlusModalOpen(false);
  };

  return (
    <>
      <div className="products-wrapper grid grid-cols-card gap-4">
        {/* anlık tıklanan category'i almak & product filtrelemesi için ve*/}
        {/* search işlemi categorilere göre ayrılmış productlar için :filter((product)=>product.title.toLowerCase().includes(search))*/}
        {filteredCategory
          .filter((product) => product.title.toLowerCase().includes(search))
          .map((product) => {
            return (
              <div
                onClick={() => handleClick(product)}
                key={product._id}
                className="product-item border hover:shadow-lg cursor-pointer transition-all select-none"
              >
                <div className="product-img">
                  <img
                    src={product.img}
                    alt=""
                    className="h-28 object-cover w-full border-b"
                  />
                </div>
                <div className="product-info flex flex-col p-3">
                  <span className="font-bold">{product.title}</span>
                  <span>{product.price}₺</span>
                </div>
              </div>
            );
          })}
        <div className="product-item border hover:shadow-lg cursor-pointer transition-all select-none">
          <div className="products-icon" onClick={showPlusModal}>
            <div>
              <PlusOutlined className="md:text-2xl text-white" />
            </div>
          </div>
        </div>
        <div
          onClick={() => navigate("/products")}
          className="product-item min-h-[180px] border hover:shadow-lg cursor-pointer transition-all select-none"
        >
          <div className="products-icon">
            <div>
              <EditOutlined className="md:text-2xl" />
            </div>
          </div>
        </div>
      </div>

      <AddProduct
        allCategories={allCategories}
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        isPlusModalOpen={isPlusModalOpen}
        setIsPlusModalOpen={setIsPlusModalOpen}
        handlePlusCancel={handlePlusCancel}
      ></AddProduct>
    </>
  );
}
