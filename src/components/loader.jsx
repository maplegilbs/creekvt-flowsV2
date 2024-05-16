//Styles
import styles from "./loader.module.scss"

export default function Loader({ loader_text, bottom_text }) {
    return (
        <>
            <div className={`${styles["loader"]}`}>
                {loader_text &&
                    <div className={`${styles["loading-text"]}`}>{loader_text}</div>
                }
                <div className={`${styles["loading-spinner"]}`}></div>
                {bottom_text &&
                    <div className={`${styles["loading-text"]}`}>{bottom_text}</div>
                }
            </div>
        </>
    )
}