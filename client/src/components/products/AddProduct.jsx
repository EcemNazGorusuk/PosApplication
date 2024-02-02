import React from "react";
import { Button, Form, Input, Modal, message, Select,  } from "antd";
export default function AddProduct({
  allProducts,
  setAllProducts,
  isPlusModalOpen,
  setIsPlusModalOpen,
  handlePlusCancel,
  allCategories
}) {
  const [form] = Form.useForm(); //bu hook form alanını yönetmek için

  //FETCH API İŞLEMLERİ
  //POST PRODUCT
  const onFinish = (values) => {
    console.log(values);
    try {
      fetch(process.env.REACT_APP_SERVER_URL+"/api/products/add-product", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json;charset=UTF-8" },
      });
      message.success(`Kategori başarıyla eklendi!`);
      form.resetFields(); //bu hook ile submit butonuna tıkladıktan sonra form alanı temizlenir
      setAllProducts([
        ...allProducts,
        { 
            ...values,
          _id: Math.random(),
          price: Number(values.price),
        },
      ]); //ekleme işleminin sayfada anlık yansıması için
      setIsPlusModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  //select category
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <Modal
      title="Yeni Ürün Ekle"
      open={isPlusModalOpen}
      onCancel={handlePlusCancel}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          //title, product modelinden dolayı
          name="title"
          label="Ürün Adı"
          rules={[{ required: true, message: "Ürün Adı Alanı Boş Geçilemez!" }]}
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
  );
}
