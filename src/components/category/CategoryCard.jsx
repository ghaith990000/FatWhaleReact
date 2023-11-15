import styles from "../../styles/categorycard.module.css";
const CategoryCard = ({name, image}) => {
    return (
        <div className={styles.box}>
            <div className={styles.imgBox}>
                <img src={image} alt="" />
            </div>
            <h2 className={styles.title}>{name}</h2>
        </div>
    )
}

export default CategoryCard;