import {firestore} from "../firebase";
import { collection,  updateDoc, arrayUnion , doc, getDoc } from "firebase/firestore";

const collectionName = 'menus';

const generateMealId = () => {
    return doc(collection(firestore, collectionName)).id;
};


export const createMeal = async(menuId, mealData, categoryIds) => {
    try {
        const menuDocRef  = doc(firestore, collectionName, menuId);

        const mealId = generateMealId();

        await updateDoc(menuDocRef, {
            meals: arrayUnion({
                id: mealId,
                name: mealData.name,
                description: mealData.description,
                price: mealData.price,
                image: mealData.image,
                categories: categoryIds,
            }),
        });
        
        console.log("Meal added to the menu successfully.");
    } catch(error){
        console.log("Error adding meal to the menu: ", error);
    }
};

export const getAllMealsFromMenu = async (menuId) => {
    try {
        const menuDocRef = doc(firestore, collectionName, menuId);
        const menuSnapshot = await getDoc(menuDocRef);

        if(menuSnapshot.exists()){
            const menuData = menuSnapshot.data();
            const meals = menuData.meals || [];

            return meals;
        }else {
            console.log("Menu does not exist.");
            return [];
        }
    }catch(error){
        console.log("Error getting meals from the menu: ", error);
        return [];
    }
}