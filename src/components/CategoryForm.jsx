import { useState } from "react";
import styles from "../styles/menuform.module.css";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {v4 as uuidv4} from "uuid";
import {addCategoryToMenu} from "../services/Category"
const CategoryForm = ({menuId, onClose, onCategoryCreated}) => {
    const [categoryData, setCategoryData] = useState({
        name: '',
        description: '',
        // image: '',
    });

    const [file, setFile] = useState(null);

    const generateUniqueIdentifier = () => {
        return uuidv4();
    }
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setCategoryData((prevData) => ({
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

        if(!file){
            console.log("Please select a file.");
            return;
        }

        try {
            console.log("Data stored", categoryData);
            // Upload images to firebase storage
            const uniqueIdentifier = generateUniqueIdentifier();
            const storageRef = ref(storage, `categories/${uniqueIdentifier}_${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            // Listen for state changes, errors, and completion of the upload
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Track upload progress if needed
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + '% done');
                },
                (error) => {
                    console.error('Error uploading file: ', error);
                },
                async () => {
                    // Upload completed successfully, get the download URL
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    console.log("File is available at", downloadURL);

                    setFile(null);
                    addCategoryToMenu(menuId, {...categoryData, image: downloadURL });

                    onClose();
                    onCategoryCreated();
                    

                }

            )
            
        }catch(error){
            console.log("There is an error", error);
        }

        console.log("Category Submit method called");
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                    Name
                </label>
                <input type="text" id='name' name='name' className={styles.input} placeholder='Enter category name' onChange={handleChange} />
                
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
            <button className={styles.button} type="submit">Create New Category</button>
        </form>
    )
}

export default CategoryForm;