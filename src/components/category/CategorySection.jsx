import { useState, useEffect } from "react";
import Modal from "../Modal";
import styles from "../../styles/menudetail.module.css";
import CategoryCard from "./CategoryCard";
import CategoryForm from "./CategoryForm";
import { getAllCategoriesFromMenus } from "../../services/Category";
import NoContent from "../NoContent";
const CategorySection = ({menuId}) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const menuCategories = await getAllCategoriesFromMenus(menuId);
                setCategories(menuCategories);
            }catch(error){
                console.error("Error fetching categories: ", error);
            }
        };

        fetchCategories();
        console.log("Categories Info: ", categories);
    }, []);

    const handleCategoryCreated = async () => {
        try{
            const categories = await getAllCategoriesFromMenus(menuId);
            setCategories(categories);
            console.log("Categories updated");
    
        }catch(error){
            console.log("Error happend", error);
        }
        
    }
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
          <CategoryForm menuId={menuId} onClose={closeModal} onCategoryCreated={handleCategoryCreated} />
        </Modal>
        {categories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-2 mx-16">
        
                { categories.map((category) => (
                    <CategoryCard name={category.name} image={category.image}/>
                ))}
                
                
            </div>
        ): <NoContent message="There is no categories. Please add one" /> }
        
      </div>
    )
}

export default CategorySection;