import React from "react";
import { Button, message } from "antd";
import {
  ClearOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCart,
  resetCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

export default function CartTotals() {
  const navigate=useNavigate();
  //redux addProduct show in cart totals
  const cart = useSelector((state) => state.cart);
  const cartItems = cart.cartItems;

  //redux deleteCart show in cart totals
  const dispatch = useDispatch(); //dispatch içinde reducerlara erişilir

  //manual silme
  const handleDeleteClick = (item) => {
    if (window.confirm("Emin misiniz?")) {
      dispatch(deleteCart(item));
      message.success("Ürün Sepetten Silindi.");
    }
  };

  //otomatik tümünü silme
  const handleDeleteAuto = (items) => {
    if (window.confirm("Emin misiniz?")) {
      dispatch(resetCart());
      message.success("Sepet Başarıyla Temizlendi.");
    }
  };

  //add quantity button
  const handleIncreaseAmount = (item) => {
    dispatch(increaseQuantity(item));
  };

  //delete quantity button
  const handleDecreaseAmount = (item) => {
    dispatch(decreaseQuantity(item));
  };
  return (
    <div className="cart h-full max-h-[calc(100vh_-_90px)] flex flex-col whitespace-nowrap">
      <h2 className="rounded-md bg-gradient-to-r from-[#485fad] via-[#6a95f1] to-[#3a4f91] text-center py-4 text-white font-bold tracking-wide">
        Sepetteki Ürünler
      </h2>

      <ul className="cart-items px-2 flex flex-col gap-y-3 py-2 overflow-y-auto">
        {cartItems.length > 0
          ? cartItems.map((item) => (
              <li className="cart-item " key={item._id}>
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <div className="pt-1">
                      <img
                        className="cursor-pointer"
                        width={100}
                        height={100}
                        alt="img"
                        src={item.img}
                        onClick={() => handleDeleteClick(item)}
                      />
                    </div>

                    <div className="flex flex-col py-4">
                      <div className="font-bold font-4 text-md">{item.title}</div>
                      <div>
                        {item.price} ₺ X {item.quantity}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-1 py-6 ">
                    <div className="w-7 h-7 bg-[#5170C0] justify-center rounded-full">
                      <PlusCircleOutlined
                        size={20}
                        className="text-white ml-1 py-1 text-xl"
                        onClick={() => handleIncreaseAmount(item)}
                      />
                    </div>
                    <div className="font-bold"> {item.quantity} adet </div>
                    <div className="w-7 h-7 bg-[#5170C0] justify-center rounded-full">
                      <MinusCircleOutlined
                        size={20}
                        className="text-white ml-1 py-1 text-xl"
                        onClick={() => {
                          if (item.quantity === 1) {
                            if (window.confirm("Ürün Silinsin Mi?")) {
                              handleDecreaseAmount(item);
                            }
                            resetCart(item);
                          }
                          if (item.quantity > 1) {
                            handleDecreaseAmount(item);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </li>
            )).reverse()//son ekleneni başa alır 
          : "Sepette hiç ürün yok..."}
      </ul>

      <div className="cart-totals mt-auto ">
        <div className="border-b border-t bg-[#ecf2fe] mt-4">
          <div className="flex justify-between p-2 gap-2">
            <b>Ara toplam</b>

            <span className="text-xl">
              {cart.total > 0 ? cart.total.toFixed(2) : "0.00"}₺
            </span>
          </div>
          <div className="flex justify-between p-2 border-t border-[#e0e3fe]">
            <b>KDV %{cart.tax}</b>
            <span className="text-orange-700 text-lg">
              {(cart.total * cart.tax) / 100 > 0
                ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                : 0}
              ₺
            </span>
          </div>
          <div className="flex justify-between gap-2 p-2 border-t border-[#e0e3fe]">
            <b className="text-[#5675C9] font-[800] text-lg">GENEL TOPLAM</b>
            <span className="text-xl">
              {cart.total + (cart.total * cart.tax) / 100 > 0
                ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                : 0}
            </span>
          </div>

          <div className="flex justify-between p-2 border-t border-[#e0e3fe] py-3">
            <Button onClick={()=>navigate("/cart")} className="w-full text-white bg-gradient-to-r from-[#6988ef] via-[#76a1ff] to-[#3c5fd0] font-[800] text-sm rounded-lg hover:text-white hover:bg-gradient-to-br hover:from-[#b9b4e7] hover:to-[#c7d5f3]">
              SİPARİŞ OLUŞTUR
            </Button>
          </div>

          <div className="flex justify-between p-2 border-t border-[#e0e3fe] py-3">
            <Button disabled={cartItems.length ===0} className="flex  justify-center gap-3 w-full text-white bg-gradient-to-r from-[#e55050]  via-[#ef8c8c] to-[#e55050] font-[800] text-sm rounded-lg hover:text-white hover:bg-gradient-to-br hover:from-[#b9b4e7] hover:to-[#c7d5f3]">
              <div>
                <ClearOutlined className="" />
              </div>
              <div onClick={() => handleDeleteAuto(cartItems)} >
                SİPARİŞİ TEMİZLE
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
