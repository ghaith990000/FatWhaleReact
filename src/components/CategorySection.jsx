import { useState } from "react";
import Modal from "./Modal";
import styles from "../styles/menudetail.module.css"
import CategoryCard from "./CategoryCard";
import CategoryForm from "./CategoryForm";
const CategorySection = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
      };
    
      const closeModal = () => {
        setModalOpen(false);
      }
    return (
        <div className={styles.meals}>
        <h2 className={styles.sectionHeader}>Category</h2>
        <button className={styles.addBtn} onClick={openModal}>Add New Category</button>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <CategoryForm />
        </Modal>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-2 mx-16">

            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            
        </div>
      </div>
    )
}

export default CategorySection;