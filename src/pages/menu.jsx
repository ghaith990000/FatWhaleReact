import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Navbar from "../components/Navbar";
import { CardActionArea } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import {getMenu} from "../services/Menu";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import MealCard from '../components/meal/MealCard';
import styles from "../styles/menudetail.module.css";
import Modal from '../components/Modal';
import MealForm from '../components/meal/MealForm';
import CategorySection from '../components/category/CategorySection';
import { getAllCategoriesFromMenus } from "../services/Category";
import { getAllMealsFromMenu } from '../services/Meal';


export const MenuLoader = async ({params}) => {
  const menu = await getMenu(params.menuId);
  return {menu};
}

const Menu = () => {
  const [value, setValue] = React.useState(0);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [meals, setMeals] = React.useState([]);

  const {menu} = useLoaderData();
  console.log(menu);


  React.useEffect(() => {
      const fetchData = async () => {
          try {
              const menuCategories = await getAllCategoriesFromMenus(menu.id);
              setCategories(menuCategories);

              const menuMeals = await getAllMealsFromMenu(menu.id);
              setMeals(menuMeals);
          }catch(error){
              console.error("Error fetching data: ", error);
          }
      };

      fetchData();
      console.log("Categories Info: ", categories);
      console.log("Meals Info", meals);
  }, []);

  const handleCategoryCreated = async () => {
    try{
        const categories = await getAllCategoriesFromMenus(menu.id);
        setCategories(categories);
        console.log("Categories updated");

    }catch(error){
        console.log("Error happend", error);
    }
    
  }
  const handleMealCreated = async () => {
    try{
      const meals = await getAllMealsFromMenu(menu.id);
      setMeals(meals);
      console.log("Meals updated successfully");
    }catch(error){
      console.log("Error happened", error);
    }
  }

  const tabs = [
    { label: 'Home', value: 0 },
    { label: 'About Us', value: 1 },
    { label: 'Services', value: 2 },
    { label: 'Products', value: 3 },
    { label: 'Contact', value: 4 },
    { label: 'Contact', value: 5 },
    { label: 'Contact', value: 6 },
    // Add more tabs as needed
  ];

  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  }
  return (
    <div>
        <Navbar />
        <section className={`relative bg-center bg-contain bg-no-repeat bg-gray-700 bg-blend-multiply`}>
          <img className="absolute top-0 object-cover left-0 h-full w-full -z-100" src={menu.imageUrl} alt="" />
          <div class="relative z-10 px-4 mx-auto max-w-screen-xl text-center py-24 ">
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">{menu.name}</h1>
              <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">{menu.description}</p>
          </div>
          <div className="absolute top-0 left-0 h-full w-full bg-black opacity-60 z-5"></div>
      </section>
      
      <CategorySection menuId={menu.id} categories={categories} onCategoryCreated={handleCategoryCreated}/>

      <div className={styles.meals}>
        <h2 className={styles.sectionHeader}>Meals</h2>
        <button className={styles.addBtn} onClick={openModal}>Add New Meal</button>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <MealForm onClose={closeModal} onMealCreated={handleMealCreated} categories={categories} menuId={menu.id}/>
        </Modal>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-2 mx-16">
          {meals.map((meal, index) => (
            <MealCard key={meal.id} name={meal.name} description={meal.description} price={meal.price} image={meal.image}  />
          ))}
        </div>
      </div>
      
    </div>
  );
}

export default Menu;