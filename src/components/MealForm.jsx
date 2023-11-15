import { useState } from "react"; 
import styles from "./../styles/menuform.module.css";
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
                <label htmlFor="name" className={styles.label}>
                    Name
                </label>
                <input type="text" id='name' name='name' className={styles.input} placeholder='Enter meal name' onChange={handleChange} />
                
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="description" className={styles.label}>
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
            <button className={styles.button} type="submit">Create New Meal</button>
        </form>
    )
}  

export default MealForm;