import React from "react";
import { Button, Form, Input, Modal, message } from "antd";
export default function AddCategory({
  allCategories,
  setAllCategories,
  isPlusModalOpen,
  setIsPlusModalOpen,
  handlePlusCancel,
}) {
  const [form] = Form.useForm(); //bu hook form alanını yönetmek için

  //FETCH API İŞLEMLERİ
  //POST CATEGORY
  const onFinish = (values) => {
    console.log(values);
    try {
      fetch(process.env.REACT_APP_SERVER_URL+"/api/categories/add-category", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json;charset=UTF-8" },
      });
      message.success(`Kategori başarıyla eklendi!`);
      form.resetFields(); //bu hook ile submit butonuna tıkladıktan sonra form alanı temizlenir
      setAllCategories([
        ...allCategories,
        {
          _id: Math.random(),
          title: values.title,
        },
      ]); //ekleme işleminin sayfada anlık yansıması için
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Yeni Kategori Ekle"
      open={isPlusModalOpen}
      onCancel={handlePlusCancel}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          //title, category modelinden dolayı
          name="title"
          label="Kategori Ekle"
          rules={[{ required: true, message: "Kategori Alanı Boş Geçilemez!" }]}
        >
          <Input />
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
