import styles from "../styles/mealcard.module.css";
const MealCard = () =>{
    return (
        <div className={styles.box}>
            <div className={styles.imgBox}>
                <img src="https://themewagon.github.io/feane/images/f1.png" alt="" />
            </div>
            <div className={styles.detailBox}>
                <h5>Delicious Pizza</h5>
                <p>
                    Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque
                </p>
                <div className="options">
                    <h6>20 BHD</h6>
                </div>
            </div>
            
        </div>
    )
}

export default MealCard;