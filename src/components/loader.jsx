//Icons
import { faDroplet } from "@fortawesome/free-solid-svg-icons"
//Styles
import styles from "./loader.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Loader({ loader_text, bottom_text, type }) {
    return (
        <>
            {type === 'spinner' &&
                <div className={`${styles["loader"]}`}>
                    {loader_text &&
                        <div className={`${styles["loading-text"]}`}>{loader_text}</div>
                    }
                    <div className={`${styles["loading-spinner"]}`}></div>
                    {bottom_text &&
                        <div className={`${styles["loading-text"]}`}>{bottom_text}</div>
                    }
                </div>
            }
            {type === 'rain' &&
                <div className={`${styles["loader"]}`}>
                    {loader_text &&
                        <div className={`${styles["loading-text"]}`}>{loader_text}</div>
                    }
                    <div style={{ display: "flex", justifyContent: "space-evenly", width: "95%", height: "100%" }}>
                        <div className={`${styles['droplet']} ${styles["drip"]}`}>
                            <FontAwesomeIcon icon={faDroplet} size="lg" style={{ color: "#4e647b", }} />
                        </div>
                        <div className={`${styles['droplet']} ${styles["drip2"]}`}>
                            <FontAwesomeIcon icon={faDroplet} size="lg" style={{ color: "#4e647b", }} />
                        </div>
                        <div className={`${styles['droplet']} ${styles["drip3"]}`}>
                            <FontAwesomeIcon icon={faDroplet} size="lg" style={{ color: "#4e647b", }} />
                        </div>
                        <div className={`${styles['droplet']} ${styles["drip4"]}`}>
                            <FontAwesomeIcon icon={faDroplet} size="lg" style={{ color: "#4e647b", }} />
                        </div>
                        <div className={`${styles['droplet']} ${styles["drip5"]}`}>
                            <FontAwesomeIcon icon={faDroplet} size="lg" style={{ color: "#4e647b", }} />
                        </div>
                        <div className={`${styles['droplet']} ${styles["drip6"]}`}>
                            <FontAwesomeIcon icon={faDroplet} size="lg" style={{ color: "#4e647b", }} />
                        </div>
                    </div>
                    {bottom_text &&
                        <div className={`${styles["loading-text"]}`}>{bottom_text}</div>
                    }
                </div>
            }
        </>
    )
}