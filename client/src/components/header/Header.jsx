import React from "react";
import {
  UserOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  BarChartOutlined,
  LogoutOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Badge, message } from "antd";
import { Input } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Header({ setSearch }) {
  //redux product count
  const cart = useSelector((state) => state.cart);
  console.log(" `cart count:` ", cart.cartItems.length);

  //logout işlemi localde
  const navigate = useNavigate();
  const logout = () => {
    if (window.confirm("Çıkış yapmak istediğinize emin misiniz?")) {
      localStorage.removeItem("userStorage");
      navigate("/login");
      message.success("Çıkış işlemi başarılı!");
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  //pathname'e göre işlem (inputa tıklanınca sadece yolu / olan kısımda çalışsın yoksa o yola yönlensin)
  const { pathname } = useLocation();
  console.log("pathname: ", pathname);

  return (
    <div className="border-b mb-6 header-bg">
      <header className="flex py-4 px-6 gap-7 justify-between items-center">
        <div className="logo">
          <a href="/">
            <h2 className="logo-container text-white text-2xl font-bold md:text-4xl">
              LOGO
            </h2>
          </a>
        </div>
        <div
          onClick={() => {
            pathname !== "/" && navigate("/");
          }}
          className="header-search flex-1 flex justify-center"
        >
          <Input
            //search işlemi categorilere göre ayrılmış productlar için
            onChange={(e) => handleSearch(e)}
            className=" rounded-2xl max-w-screen-md"
            size="large"
            placeholder="Ürün ara..."
            prefix={<UserOutlined className="search-container text-gray-900" />}
          />
        </div>
        <div className={` menu-links flex md:static fixed z-50 bottom-0 md:w-auto w-screen md:bg-none bg-gradient-to-br from-red-400 to-blue-400 md:py-0 py-2 gap-8 justify-between left-0 items-center md-border-t-0 border-t-1 md:px-0 px-2`}>
          <Link className={`menu-a  ${pathname==="/" && "text-[#a04634]"}`} to={"/"}>
            <HomeOutlined className="text-xl md:text-2xl" />
            <span className="text-[10px] md:text-xs">Anasayfa</span>
          </Link>

          <Badge
            offset={[0, -2]}
            className="hover:text-[#6d2b6b] hidden md:flex"
            count={cart.cartItems.length}
            color="purple"
          >
            <Link className={`menu-a ${pathname==="/cart" && "text-[#a04634]"}`} to={"/cart"}>
              <ShoppingCartOutlined className="text-xl md:text-2xl" />
              <span className="text-[10px] md:text-xs">Sepet</span>
            </Link>
          </Badge>

          <Link className={`menu-a ${pathname==="/bills" && "text-[#a04634]"}`} to={"/bills"}>
            <CopyOutlined className="text-xl md:text-2xl" />
            <span className="text-[10px] md:text-xs">Faturalar</span>
          </Link>
          <Link className={`menu-a ${pathname==="/customers" && "text-[#a04634]"}`} to={"/customers"}>
            <UserOutlined className="text-xl md:text-2xl" />
            <span className="text-[10px] md:text-xs">Müşteriler</span>
          </Link>
          <Link className={`menu-a ${pathname==="/statistic" && "text-[#a04634]"}`} to={"/statistic"}>
            <BarChartOutlined className="text-xl md:text-2xl" />
            <span className="text-[10px] md:text-xs">İstatistikler</span>
          </Link>
          <div className="menu-a" onClick={logout}>
            <LogoutOutlined className="text-xl md:text-2xl" />
            <span className="text-[10px] md:text-xs">Çıkış</span>
          </div>
        </div>
        <div>
          <Link className="menu-a md:hidden flex" to={"/cart"}>
            <Badge
              offset={[0, -2]}
              className="hover:text-[#6d2b6b] "
              count={cart.cartItems.length}
              color="purple"
            >
              <ShoppingCartOutlined className="text-xl md:text-2xl" />
            </Badge>

            <span className="text-[10px] md:text-xs">Sepet</span>
          </Link>
        </div>
      </header>
    </div>
  );
}
