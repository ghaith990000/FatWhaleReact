import React, {useState} from "react";
import { createMenu } from './../services/Menu';
import { Form } from "react-router-dom";
import { ref, getStorage, uploadBytesResumable, getDownloadURL } from "firebase/storage"; 
import { storage } from "../firebase";
import styles from "./../styles/menuform.module.css";
const MenuForm = ({ onClose }) => {
    const [menuData, setMenuData] = useState({
        name: '',
        description: '',
        image: '',
        items: '',
    });

    const [file, setFile] = useState(null);


    const handleChange = (e) => {
        const {name, value} = e.target;
        setMenuData((prevData) => ({
            ...prevData,
            [name]:value,
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
            console.log("Data stored", menuData);
            // Upload image to firebase storage
            const storageRef = ref(storage, `images/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            // Listen for state changes, errors, and completion of the upload.
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

        

                    // console.log("Menu data after upload", menuData);

                    const menuId = await createMenu({...menuData, image: downloadURL});
                    console.log("Menu created with ID: ", menuId);

                    // Close the model
                    onClose();


                }
            );

            
        }catch (error){
            console.log("Error creating menu: ", error);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                    Name
                </label>
                <input type="text" id='name' name='name' className={styles.input} placeholder='Enter your email' onChange={handleChange} />
                
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="description" className={styles.label}>
                    Description
                </label>
                <textarea name="description" id="description" onChange={handleChange} placeholder="please a write a description" />
                
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="image" className={styles.label}>
                    Image
                </label>
                <input type="file" id='image' name='image' onChange={handleFileChange} className={styles.input} />
                
            </div>
            <button type="submit">Create New Menu</button>
        </form>
    )
}

export default MenuForm;