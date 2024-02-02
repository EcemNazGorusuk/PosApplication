import React, { useEffect, useRef, useState } from "react";
import Header from "../components/header/Header";
import Highlighter from "react-highlight-words"; //npm i react-highlight-words
import { SearchOutlined } from "@ant-design/icons";
import { Button, Table, Card, Space, Input, Spin } from "antd";
import PrintBill from "../components/bills/PrintBill";
import { useDispatch, useSelector } from "react-redux";
export default function BillPage() {
  //selected customer in table cell
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  console.log(selectedCustomer);

  //FETCH FOR BILLS (GET ALL BILLS)
  const [allBills, setAllBills] = useState();
  useEffect(() => {
    //sayfa yüklendiğinde çalışması için
    const getBills = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL+"/api/bills/get-all");
        const data = await res.json();
        console.log(data);
        setAllBills(data);
      } catch (error) {
        console.log(error);
      }
    };
    getBills();
  }, []);

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

  const columns = [
    {
      title: "Müşteri Adı",
      dataIndex: "customerName",
      key: "customerName",
      ...getColumnSearchProps("customerName"),
    },
    {
      title: "Telefon Numarası",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
      ...getColumnSearchProps("customerPhoneNumber"),
    },
    {
      title: "Oluşturma Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => {
        const dateObject = new Date(createdAt);
        const formattedDate = `${dateObject.getFullYear()}-${(
          dateObject.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${dateObject
          .getDate()
          .toString()
          .padStart(2, "0")}`;
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: "Ödeme Yöntemi",
      dataIndex: "paymentMode",
      key: "paymentMode",
      ...getColumnSearchProps("paymentMode"),
    },
    {
      title: "Toplam Fiyat",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text) => {
        return <span>{text}₺</span>;
      },
      //sort işlemi
      sorter: (a, b) => a.totalAmount - b.totalAmount,
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      render: (_, item) => {
        return (
          <div className=" mt-auto  justify-center">
            <Button
              onClick={() => {
                showModal();
                setSelectedCustomer(item);
              }}
              className="w-auto text-white bg-gradient-to-r from-[#6988ef] via-[#76a1ff] to-[#3c5fd0] font-[800] text-sm rounded-lg hover:text-white hover:bg-gradient-to-br hover:from-[#b9b4e7] hover:to-[#c7d5f3]"
            >
              Yazdır
            </Button>
          </div>
        );
      },
    },
  ];


  return (
    <>
      <Header />
      <h1 className="text-4xl font-bold text-center m-4">FATURALAR</h1>
      {allBills ? (
        <div className="px-6">
         
          <Table
            dataSource={allBills}
            columns={columns}
            bordered
            scroll={{ x: 1000, y: 300 }}
            rowKey="_id"
          />
          <div className="cart-totals flex justify-end"></div>
        </div>
      ) : (
        <Spin
          size="large"
          className="absolute top-1/2 h-screen w-screen flex justify-center"
        />
      )}

      {/* MODAL KISMI  */}
      {open && (
        <PrintBill
          open={open}
          setOpen={setOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          allBills={allBills}
          setAllBills={setAllBills}
          selectedCustomer={selectedCustomer}
        />
      )}
    </>
  );
}
