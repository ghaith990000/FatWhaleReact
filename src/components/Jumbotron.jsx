import React, { useState, useEffect} from 'react';

import styles from './../styles/jumbotron.module.css'
import backgroundImage from "./../images/hero-bg.jpg";

const Jumbotron = () => {
    const data = [
        {heading: "Angus Bliss: Burger Edition", paragraph: "Welcome to a burger experience like no other at Fat Whale!Indulge in the succulent richness of our Angus beef burgers, expertly crafted for the discerning palate. Each bite is a journey into paradise, where premium qulaity meets culinary perfection"},
        {heading: "Cluck Yeah!Fried Chicken Delight", paragraph: "Crispy, juicy, and downright irresistible - our fried chicken is a showstopper! At Fat Whale, we've elevated the art of fried chicken to new heights. From crunchy bites to savory tenderness, every piece is a celebration of the finest flavors and textures"},
        {heading: "Bahrain's Burger Haven", paragraph: "Immerse yourself in the world of burgers at Fat Whale, Bahrain's go-to spot for Angus beef and fried chicken delights. Our menu is a symphony of sizzling Angus patties and golden-fried chicken, each creation a masterpiece that reflects our commitment to quality and taste."},
    ];

    const [currentText, setCurrentText] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentText((prevText) => (prevText + 1) % data.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [data.length]);

    return (
        <div className={styles.jumbotron} style={{ backgroundImage: `url(${backgroundImage})`, objectFit: 'contain'}}>
            <div className={styles.textContainer}>
                {data.map((item, index) => (
                    <div key={index} className={`${styles.text} ${currentText === index ? styles.active : ''} ${currentText !== index ? styles.next : ''}`}>
                        <h2 className={styles.title}>{item.heading}</h2>
                        <p className={styles.info}>{item.paragraph}</p>
                    </div>  
                ))}
            </div>
            <div className={styles.dotsContainer}>
                {data.map((_, index) => (
                    <span key={index} className={`${styles.dot} ${currentText === index ? styles.active : ''}`} 
                    onClick={() => setCurrentText(index)} />
                ))}
            </div>
        </div>
    );

};

export default Jumbotron;
