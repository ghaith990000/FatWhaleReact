import styles from "../../styles/mealcard.module.css";
const MealCard = ({name, description, price, image}) =>{
    return (
        <div className={styles.box}>
            <div className={styles.imgBox}>
                <img src={image} alt="" />
            </div>
            <div className={styles.detailBox}>
                <h5>{name}</h5>
                <p>
                    {description}
                </p>
                <div className="options">
                    <h6>{price} BHD</h6>
                </div>
            </div>
            
        </div>
    )
}

export default MealCard;