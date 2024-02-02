import React, { useRef, useState } from "react";
import { Button, Space, Card, Table, message, Popconfirm, Input } from "antd";
import Highlighter from "react-highlight-words"; //npm i react-highlight-words
import { SearchOutlined } from "@ant-design/icons";
import Header from "../components/header/Header";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import CreateBill from "../components/cart/CreateBill";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  resetCart,
  deleteCart,
} from "../redux/cartSlice";

export default function CartPage() {
   //search for table 
   const [searchText, setSearchText] = useState("");
   const [searchedColumn, setSearchedColumn] = useState("");
   const searchInput = useRef(null);

   const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });


  //MODAL İÇİN STATE
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  //redux show in cart totals
  const cart = useSelector((state) => state.cart);
  const cartItems = cart.cartItems;
  const dispatch = useDispatch(); //dispatch içinde reducerlara erişilir

  const columns = [
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      width: "120px",
      render: (text) => {
        return <img src={text} alt="" className="w-full h-20 object-cover" />;
      },
    },
    {
      title: "Ürün Adı",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps("title")
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
      ...getColumnSearchProps("category")
    },
    {
      title: "Ürün Birim Fiyatı",
      dataIndex: "price",
      key: "price",
      render: (priceVal) => {
        return <span>{priceVal.toFixed(2)}₺</span>;
      },
      //sort işlemi
      sorter:(a,b)=>a.price - b.price,
    },
    {
      title: "Ürün Adedi",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, item) => {
        return (
          <div className="flex gap-1 py-6 ">
            <div className="w-7 h-7 bg-[#5170C0] justify-center rounded-full">
              <PlusCircleOutlined
                size={20}
                className="text-white ml-1 py-1 text-xl"
                onClick={() => dispatch(increaseQuantity(item))}
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
                      dispatch(decreaseQuantity(item));
                    }
                    resetCart(item);
                  }
                  if (item.quantity > 1) {
                    dispatch(decreaseQuantity(item));
                  }
                }}
              />
            </div>
          </div>
        );
      },
    },
    {
      title: "Toplam Fiyat",
      render: (text, item) => {
        return <span>{(item.price * item.quantity).toFixed(2)}₺</span>;
      },
    },

    {
      title: "Actions",
      render: (_, item) => {
        return (
          <Popconfirm
            title="Silmek için emin misiniz?"
            onConfirm={() => {
              dispatch(deleteCart(item));
              message.success("Ürün Sepetten Silindi.");
            }}
            okText="Evet"
            cancelText="Hayır"
          >
            <Button type="link" danger>
              Sil
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <>
      <Header />
      <div className="px-6">
        <Table dataSource={cartItems} columns={columns} bordered  scroll={{x:1200,y:400}}/>
        <div className="cart-totals flex justify-end">
          <Space direction="vertical" size={16}>
            <Card className="w-96 bg-[#ECF2FE] mt-3">
              <div className="cart-totals mt-auto ">
                <div className="  bg-[#ecf2fe] mt-2">
                  <div className="flex justify-between p-2 gap-2 ">
                    <b className="text-lg">ARA TOPLAM</b>
                    <span className="text-lg">
                      {cart.total > 0 ? cart.total.toFixed(2) : "0.00"}₺
                    </span>
                  </div>
                  <div className="flex justify-between p-2  border-[#e0e3fe]">
                    <b className="text-lg">KDV %{cart.tax}</b>
                    <span className="text-orange-700 text-lg">
                      {(cart.total * cart.tax) / 100 > 0
                        ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                        : 0}
                      ₺
                    </span>
                  </div>
                  <div className="flex justify-between gap-2 p-2  border-[#e0e3fe]">
                    <b className="text-[#5675C9] font-[800] text-lg">TOPLAM</b>
                    <span className="text-xl">
                      {cart.total + (cart.total * cart.tax) / 100 > 0
                        ? (cart.total + (cart.total * cart.tax) / 100).toFixed(
                            2
                          )
                        : 0}₺
                    </span>
                  </div>

                  <div className="flex justify-between p-2  border-[#e0e3fe] py-3">
                    <Button
                    disabled={cartItems.length===0}
                      onClick={showModal}
                      className="w-full text-white bg-gradient-to-r from-[#6988ef] via-[#76a1ff] to-[#3c5fd0] font-[800] text-sm rounded-lg hover:text-white hover:bg-gradient-to-br hover:from-[#b9b4e7] hover:to-[#c7d5f3]"
                    >
                      SİPARİŞ OLUŞTUR
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </Space>
        </div>
      </div>

      {/* MODAL KISMI  */}
      <CreateBill
        open={open}
        setOpen={setOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </>
  );
}
