import React from "react";
import { Button, Flex, Spin } from "antd";
import Categories from "../components/categories/Categories";
import Products from "../components/products/Products";
import CartTotals from "../components/cart/CartTotals";
import Header from "../components/header/Header";
import { useState } from "react";
import { useEffect } from "react";

export default function HomePage() {
  //search işlemi categorilere göre ayrılmış productlar için
  const [search, setSearch] = useState("");
  console.log("search: ", search);

  //anlık tıklanan category'i almak & product filtrelemesi için FILTER
  const [filteredCategory, setFilteredCategory] = useState([]);

  //FETCH FOR CATEGORY (GET ALL CATEGORIES)
  const [allCategories, setAllCategories] = useState();
  useEffect(() => {
    //sayfa yüklendiğinde çalışması için
    const getCategories = async () => {
      try {
        const res = await fetch( process.env.REACT_APP_SERVER_URL+"/api/categories/get-all");
        const data = await res.json();
        console.log(data);
        data &&
          setAllCategories(
            data.map((item) => {
              return { ...item, value: item.title };
            })
          );
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  //FETCH FOR PRODUCT (GET ALL PRODUCTS)
  const [allProducts, setAllProducts] = useState();
  useEffect(() => {
    //sayfa yüklendiğinde çalışması için
    const getProducts = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL+"/api/products/get-all");
        const data = await res.json();
        console.log(data);
        setAllProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  return (
    <>
      <Header setSearch={setSearch} />

      {allProducts && allCategories ? (
        <div className="home px-6 flex justify-between gap-5 md:flex-row flex-col pb-24 md:pb-0">
          {/* flex:12br */}
          <div className=" max-h-[44.25rem] flex-col flex categories md:pb-6 overflow-y-auto overflow-x-auto  flex-1 ">
            <Categories
              allCategories={allCategories}
              setAllCategories={setAllCategories}
              setFilteredCategory={setFilteredCategory}
              allProducts={allProducts}
              search={search}
            />
          </div>

          <div className="min-h-[32rem] products flex-[9] max-h-[calc(100vh_-_112px)] overflow-y-auto scrollbar-hide pb-10">
            <Products
              allProducts={allProducts}
              setAllProducts={setAllProducts}
              allCategories={allCategories}
              filteredCategory={filteredCategory}
              search={search}
            />
          </div>

          <div className="cart-wrapper flex-[2] border rounded-lg h-[50.25rem]">
            <CartTotals />
          </div>
        </div>
      ) : (
        <Spin
          size="large"
          className="absolute top-1/2 h-screen w-screen flex justify-center"
        />
      )}
    </>
  );
}
