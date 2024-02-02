import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Form,
  Input,
  Modal,
  Table,
  message,
  Select,
} from "antd";

export default function EditProduct() {

  //for update product state
  const [editingRow, setEditingRow] = useState({});
  console.log(editingRow);


  //MODAL & FORM
  const [form] = Form.useForm(); //bu hook form alanını yönetmek için

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const showEditModal = () => {
    setIsEditModalOpen(true);
  };
  const handleEditOk = () => {
    setIsEditModalOpen(false);
  };
  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };

  //FETCH FOR PRODUCT (GET ALL PRODUCTS)
  const [allProducts, setAllProducts] = useState([]);
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


  //FETCH FOR CATEGORY (GET ALL CATEGORIES)
  const [allCategories, setAllCategories] = useState([]);
  useEffect(() => {
    //sayfa yüklendiğinde çalışması için
    const getCategories = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL+"/api/categories/get-all");
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


  const columns = [
    {
      title: "Ürün Adı",
      dataIndex: "title",
      width: "4%",
      render: (_, product) => {
        return product.title;
      },
    },
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      width: "4%",
      render: (_, product) => {
        return (
          <img
            className="h-20 object-cover w-full"
            alt="ürün resmi"
            src={product.img}
          />
        );
      },
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      width: "8%",
    },
    {
      title: "Kategori",
      dataIndex: "category",
      width: "8%",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "6%",
      key: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-1 justify-between ">
            <Button
              type="link"
              className="pl-0"
              onClick={() => {
                showEditModal();
                setEditingRow(record);
              }}
            >
              Düzenle
            </Button>

            <Button
              danger
              type="link"
              onClick={() => deleteProduct(record._id)}
            >
              Sil
            </Button>
          </div>
        );
      },
    },
  ];

  //FETCH API İŞLEMLERİ
  //UPDATE PRODUCT
  const onFinish = (values) => {
    console.log(values);
    try {
      fetch(process.env.REACT_APP_SERVER_URL+"/api/products/update-product", {
        method: "PUT",
        body: JSON.stringify({ ...values, productId: editingRow._id }),
        headers: { "Content-type": "application/json;charset=UTF-8" },
      });
      message.success(`Ürün başarıyla kaydedildi!`);
      setAllProducts(
        //yapılan update'in anlık olarak ekrana yansıması
        allProducts.map((item) => {
          if (item._id === editingRow._id) {
            return values;
          }
          return item;
        })
      );
    } catch (error) {
      message.success("Bir şeyler yanlış gitti.");
      console.log(error);
    }
  };

  
  //FETCH API İŞLEMLERİ
  //DELETE PRODUCT
  const deleteProduct = (id) => {
    if (window.confirm("Emin misiniz?")) {
      try {
        fetch(process.env.REACT_APP_SERVER_URL+"/api/products/delete-product", {
          method: "DELETE",
          body: JSON.stringify({ productId: id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        message.success("Ürün başarıyla silindi.");
        setAllProducts(allProducts.filter((item) => item._id !== id));
      } catch (error) {
        message.error("Bir şeyler yanlış gitti.");
        console.log(error);
      }
    }
  };

  //select category
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <Table
        dataSource={allProducts}
        columns={columns}
        bordered
        rowKey={"_id"}
        scroll={{
          x: 1000,
          y: 600,
        }}
      />
      <Modal
        title="Yeni Ürün Ekle"
        open={isEditModalOpen}
        onCancel={handleEditCancel}
        footer={false}
      >
        {/* initial values form içinde geçilerek get product'ın düzgün çalışması sağlanır */}
        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
          initialValues={editingRow}
        >
          <Form.Item
            //title, product modelinden dolayı
            name="title"
            label="Ürün Adı"
            rules={[
              { required: true, message: "Ürün Adı Alanı Boş Geçilemez!" },
            ]}
          >
            <Input placeholder="Bir Ürün Adı Giriniz" />
          </Form.Item>
          <Form.Item
            //img, product modelinden dolayı
            name="img"
            label="Ürün Görseli"
            rules={[
              { required: true, message: "Ürün Resim Alanı Boş Geçilemez!" },
            ]}
          >
            <Input placeholder="Bir Görsel Linki Giriniz" />
          </Form.Item>
          <Form.Item
            //price, product modelinden dolayı
            name="price"
            label="Ürün Fiyatı"
            rules={[
              { required: true, message: "Ürün Fiyatı Alanı Boş Geçilemez!" },
            ]}
          >
            <Input placeholder="Ürün Fiyatı Giriniz" />
          </Form.Item>
          <Form.Item
            //category, product modelinden dolayı
            name="category"
            label="Kategori Seç"
            rules={[
              { required: true, message: "Ürün Kategori Alanı Boş Geçilemez!" },
            ]}
          >
            <Select
              showSearch
              placeholder="Bir Kategori Seçiniz"
              defaultValue=""
              style={{
                width: "100%",
              }}
              onChange={handleChange}
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.title ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.title ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.title ?? "").toLowerCase())
              }
              options={allCategories}
            />
          </Form.Item>
          <Form.Item className="flex justify-end mb-0">
            <Button
              htmlType="submit"
              className="w-full text-white bg-gradient-to-r from-[#6988ef]  to-[#3c5fd0] font-[500] text-sm rounded-lg hover:text-white hover:bg-gradient-to-br hover:from-[#b9b4e7] hover:to-[#c7d5f3]"
            >
              Oluştur
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
