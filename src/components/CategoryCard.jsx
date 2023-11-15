import styles from "../styles/categorycard.module.css";
const CategoryCard = () => {
    return (
        <div className={styles.box}>
            <div className={styles.imgBox}>
                <img src="https://themewagon.github.io/feane/images/f2.png" alt="" />
            </div>
            <h2 className={styles.title}>Burger</h2>
        </div>
    )
}

export default CategoryCard;