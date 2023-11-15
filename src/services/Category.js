import {firestore} from "../firebase";
import { collection, addDoc, query, where, getDocs, doc, getDoc, updateDoc, arrayUnion} from "firebase/firestore";

const collectionName = 'menus';

const generateCategoryId= () => {
    return doc(collection(firestore, collectionName)).id;
};

export const addCategoryToMenu = async(menuId, categoryData) => {
    try {
        const menuDocRef = doc(firestore, collectionName, menuId);

        // Generate a unique category ID
        const categoryId = generateCategoryId();


        // Add the new category to the 'categories' array using arrayUnion
        console.log("Category Data from addCategoryToMenu Method", categoryData);
        await updateDoc(menuDocRef,{
            [`categories.${categoryId}`]: {
                name: categoryData.name,
                description: categoryData.description,
                image: categoryData.image,
            },
        });

        console.log("Category added to the menu successfully.");
    }catch(error){
        console.log("Error adding category to the menu: ", error);
    }
}

export const getAllCategoriesFromMenus = async (menuId) => {
    try {
        const menuDocRef = doc(firestore, collectionName, menuId);
        const menuSnapshot = await getDoc(menuDocRef);

        if(menuSnapshot.exists()){
            const menuData = menuSnapshot.data();
            const categories = menuData.categories || {};

            // Covert the categories object to an array
            const categoriesArray = Object.keys(categories).map((categoryId) => ({
                id: categoryId,
                ...categories[categoryId],
            }));

            return categoriesArray;
        }else {
            console.log("Menu does not exist.");
            return [];
        }
    }catch(error){
        console.log("Error getting categories from the menu: ", error);
        return [];
    }
}

