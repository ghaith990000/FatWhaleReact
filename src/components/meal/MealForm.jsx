import { useState } from "react"; 
import styles from "../../styles/menuform.module.css";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {v4 as uuidv4} from "uuid";
import {storage} from "../../firebase";
import { createMeal } from "../../services/Meal";

const MealForm = ({categories, menuId, onClose, onMealCreated}) => {
    const [mealData, setMealData] = useState({
        name: '',
        description: '',
        image: '',
        price: '',
    });

    const [file, setFile] = useState(null);
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setMealData((prevData) => ({
            ...prevData,
            [name]:value
        }));
    };

    const generateUniqueIdentifier = () => {
        return uuidv4();
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!file){
            return;
        }

        try {
            const uniqueIdentifier = generateUniqueIdentifier();
            const storageRef = ref(storage, `meals/${uniqueIdentifier}_${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                },
                (error) => {

                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    console.log("Meal image saved successfully at: ", downloadURL);

                    setFile(null);

                    // Get selected category IDs
                    const selectedCategories = categories
                    .filter((category) => document.getElementById(category.id).checked)
                    .map((category) => category.id);


                    
                    await createMeal(menuId, {...mealData, image: downloadURL}, selectedCategories);

                    setMealData({
                        name: '',
                        description: '',
                        image: '',
                        price: '',
                    });

                    onClose();
                    onMealCreated();
                }
            );

            

        }catch(error){
            console.log(error);
        }

        console.log("meal Submit method called");
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                    Name
                </label>
                <input type="text" id='name' name='name' className={styles.input} placeholder='Enter meal name' onChange={handleChange} />
                
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
                    Price
                </label>
                <input type="number" id='price' name='price' className={styles.input} placeholder='Enter price in BHD' onChange={handleChange} />
                
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
                    Description
                </label>
                <textarea name="description" className={styles.input} id="description" onChange={handleChange} placeholder="please a write a description" />
                
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Image
                </label>
                <input type="file" id='image' name='image' onChange={handleFileChange} className={`${styles.input} block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400`} />
                
            </div>
            <div className={styles.categories}>
                <h3 className="block mb-2 text-sm font-medium text-gray-900">Categories</h3>
                <div className="flex flex-wrap justify-between gap-1">
                    {categories.map((category, index) => (
                        <div class="flex w-[178px] items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                            <input id={category.id} type="checkbox" value={category.id} name={category.name} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for={category.id} class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{category.name}</label>
                        </div>
                        // <div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                        //     <input id={category.id} type="checkbox" value={category.id} name={category.name} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        //     <label for={category.id} class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{category.name}</label>
                        // </div>
                    ))}

                </div>
                
            </div>
            <button className={styles.button} type="submit">Create New Meal</button>
        </form>
    )
}  

export default MealForm;