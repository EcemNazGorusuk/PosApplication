import React, { useState } from "react";
import { Alert, Button, Form, Input, Modal, Table, message } from "antd";

export default function EditCategory({
  allCategories,
  setAllCategories,
  isEditModalOpen,
  setIsEditModalOpen,
  handleEditCancel,
}) {
  const [editingRow, setEditingRow] = useState({});
  console.log(editingRow);

  const columns = [
    {
      title: "Category Title",
      dataIndex: "title",
      render: (_, cat) => {
        if (cat._id === editingRow._id) {
          return (
            <Form.Item className="mb-0" name="title">
              <Input defaultValue={cat.title} />
            </Form.Item>
          );
        } else {
          return cat.title;
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-1 justify-around ">
            <Button
              type="link"
              onClick={() => setEditingRow(record)}
              className="pl-0"
            >
              {/* setEditingRow'a yollanan record; allCategories listesindeki her bir seçilen kategoriyi bulur   */}
              Düzenle
            </Button>
            <Button type="link" className="text-green-600" htmlType="submit">
              Kaydet
            </Button>
            <Button danger type="link" onClick={()=>deleteCategory(record._id)}>
              Sil
            </Button>
          </div>
        );
      },
    },
  ];

  //FETCH API İŞLEMLERİ
  //UPDATE CATEGORY
  const onFinish = (values) => {
    console.log(values);
    try {
      fetch(process.env.REACT_APP_SERVER_URL+"/api/categories/update-category", {
        method: "PUT",
        body: JSON.stringify({ ...values, categoryId: editingRow._id }),
        headers: { "Content-type": "application/json;charset=UTF-8" },
      });
      message.success(`Kategori başarıyla kaydedildi!`);
      setAllCategories(
        //yapılan update'in anlık olarak ekrana yansıması
        allCategories.map((item) => {
          if (item._id === editingRow._id) {
            return { ...item, title: values.title };
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
  //DELETE CATEGORY
  const deleteCategory = (id) => {
    if (window.confirm("Emin misiniz?")) {
      try {
        fetch(process.env.REACT_APP_SERVER_URL+"/api/categories/delete-category", {
          method: "DELETE",
          body: JSON.stringify({ categoryId: id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        message.success("Kategori başarıyla silindi.");
        setAllCategories(allCategories.filter((item) => item._id !== id));
      } catch (error) {
        message.error("Bir şeyler yanlış gitti.");
        console.log(error);
      }
    }
  };

  return (
    <>
      <Modal
        title="Kategori İşlemleri"
        open={isEditModalOpen}
        onCancel={handleEditCancel}
        footer={false}
      >
        <Form onFinish={onFinish}>
          <Table
            dataSource={allCategories}
            columns={columns}
            bordered
            rowKey={"_id"}
          />
        </Form>
      </Modal>
    </>
  );
}
