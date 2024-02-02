import React, { useEffect, useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, message } from "antd";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";

export default function Categories({
  allCategories,
  setAllCategories,
  setFilteredCategory,
  allProducts,
}) {

  //anlık tıklanan category'i almak & product filtrelemesi için
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  console.log("selected category: ", selectedCategory);
  useEffect(() => {
    if (selectedCategory === "Tümü") {
      setFilteredCategory(allProducts);
    } else {
      setFilteredCategory(
        allProducts.filter((item) => item.category === selectedCategory)
      );
    }
  }, [allProducts, setFilteredCategory, selectedCategory]);


  //MODAL
  const [isPlusModalOpen, setIsPlusModalOpen] = useState(false);
  const showPlusModal = () => {
    setIsPlusModalOpen(true);
  };
  const handlePlusCancel = () => {
    setIsPlusModalOpen(false);
  };

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

  return (
    <>
      <ul className="gap-4 md:flex-col flex text-center text-lg">
        {allCategories.map((category) => (
          <li
            className={`categories-li-all ${
              category.title === selectedCategory && "categories-li-selected"
            }`}
            key={category._id}
            onClick={() => setSelectedCategory(category.title)}
          >
            <span>{category.title}</span>
          </li>
        ))}

        <li className="categories-li-icon" onClick={showPlusModal}>
          <span>
            <PlusOutlined className="md:text-2xl text-white" />
          </span>
        </li>
        <li className="categories-li-icon" onClick={setIsEditModalOpen}>
          <span>
            <EditOutlined className="md:text-2xl" />
          </span>
        </li>
      </ul>

      <AddCategory
        allCategories={allCategories}
        setAllCategories={setAllCategories}
        isPlusModalOpen={isPlusModalOpen}
        setIsPlusModalOpen={setIsPlusModalOpen}
        handlePlusCancel={handlePlusCancel}
      />

      <EditCategory
        allCategories={allCategories}
        setAllCategories={setAllCategories}
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        handleEditCancel={handleEditCancel}
      />
    </>
  );
}
