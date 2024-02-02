import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    //tüm cartların tutulduğu ilk state, buradaki elemanlara erişim useSelector ile
       // cartItems: [],
       // total: 0,
    //"cart" için localstorage var olan item varsa kaydet yoksa sıfırdan ekleyince kaydet: App.js
      cartItems: localStorage.getItem("cart")
       ? JSON.parse(localStorage.getItem("cart")).cartItems
       : [],
      total: localStorage.getItem("cart")
       ? JSON.parse(localStorage.getItem("cart")).total
       : 0,
      tax: 8,
  },
  reducers: {
    //reducers içerisine yazılanlar actions olarak geçer
    //sepet işlemleri
    addProduct: (state, action) => {
      const findCartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      ); //cart Item ekleme anında var mı kontrol
      //böylece eğer item varsa action (tıklayıp ekleme) anunda var olan itemın miktarı artar,yoksa yeni item eklenir:
      if (findCartItem) {
        findCartItem.quantity = findCartItem.quantity + 1;
      } else {
        state.cartItems.push(action.payload);
      }
      //fiyat hesaplama =>total=total+price
      state.total = state.total + action.payload.price;
    },

    deleteCart: (state, action) => {
      const findCartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      ); //cart Item ekleme anında var mı kontrol
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );

      //fiyat hesaplama =>total=total-(price*quantity)
      state.total =
        state.total - action.payload.price * action.payload.quantity;
    },

    resetCart: (state) => {
      //tüm cartItem ve total 0'lanır
      state.cartItems = [];
      state.total = 0;
    },

    increaseQuantity: (state, action) => {
      const findCartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      findCartItem.quantity = findCartItem.quantity + 1;
      state.total = state.total + action.payload.price;
    },

    decreaseQuantity: (state, action) => {
      const findCartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      findCartItem.quantity = findCartItem.quantity - 1;

      if (findCartItem.quantity === 0) {
        //ürünün filtrelenip kaldırılması için:
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
      }
      state.total = state.total - action.payload.price;
    },
  },
});

export const {
  addProduct,
  deleteCart,
  resetCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions; //ilgili sayfaya import edilir & usedispatch & useSelector
export default cartSlice.reducer;
