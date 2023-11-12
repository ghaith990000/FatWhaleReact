import styles from "../styles/button.module.css";
const CustomButton = ({label, onClick}) => {
    return (
        <button className={styles.button} onClick={onClick}>
            {label}
        </button>
    )
}

export default CustomButton;