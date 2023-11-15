import { useState } from "react"; 
import styles from "../../styles/menuform.module.css";
const MealForm = () => {
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

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                <div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                    <input id="bordered-checkbox-1" type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="bordered-checkbox-1" class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default radio</label>
                </div>
                <div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                    <input id="bordered-checkbox-2" type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="bordered-checkbox-2" class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
                </div>
            </div>
            <button className={styles.button} type="submit">Create New Meal</button>
        </form>
    )
}  

export default MealForm;