import React, { useState, useEffect } from "react";
import Header from "../components/header/Header";
import userImg from "../assets/user.webp";
import moneyImg from "../assets/money.webp";
import saleImg from "../assets/sale.avif";
import koliImg from "../assets/koli.jpg";
import StatisticCard from "../components/statistic/StatisticCard";
import { Area } from "@ant-design/plots";
import { Spin } from "antd";
export default function StatisticPage() {
  //FETCH FOR BILLS (GET ALL BILLS FOR STATISTIC)
  const [data, setData] = useState();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(process.env.REACT_APP_SERVER_URL+"/api/bills/get-all")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };

  useEffect(() => {
    //sayfa yüklendiğinde çalışması için
    const getProducts = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL+"/api/products/get-all");
        const data = await res.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  const totalAmount = () => {
    const amount = data.reduce((total, item) => item.totalAmount + total, 0);
    return `${amount.toFixed(2)}₺`;
  };

  const config = {
    data,
    xField: "customerName",
    yField: "subTotal",
    xAxis: {
      range: [0, 1],
    },
  };

  //localde tanımlı olan email veya username'i çekmek
  const user = JSON.parse(localStorage.getItem("userStorage"));
  console.log("user show in statistic page:", user.username);

  return (
    <>
      <Header />{" "}
      <h1 className="text-4xl font-bold text-center mb-4">İSTATİSTİKLERİM</h1>
      {data ? (
        <div className="px-6 md:pb-0 pb-20">
          <h2>
            Hoş geldin
            <span className="text-purple-700 font-bold  text-xl">
              {user.username}.
            </span>
          </h2>
          <div className="statistic-cards my-10  grid xl:grid-cols-4 md:grid-cols-2 md:gap-10 gap-4">
            <StatisticCard
              img={userImg}
              name="Toplam Müşteri"
              subName={data ? data.length : 0}
            />

            <StatisticCard
              img={moneyImg}
              name="Toplam Kazanç"
              subName={totalAmount()}
            />

            <StatisticCard
              img={saleImg}
              name="Toplam Satış"
              subName={data ? data.length : 0}
            />
            <StatisticCard
              img={koliImg}
              name="Toplam Ürün"
              subName={products?.length}
            />
          </div>

          <div className="lg:w-full lg:h-full h-72">
            <Area {...config} />
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
