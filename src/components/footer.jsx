//Styles
import styles from "./footer.module.scss"


export default function Footer() {

  return (
    <>
      <footer className={styles["primary-footer"]}>
        <div className={styles["footer-items"]}>
          <img src="https://creekvt.com/wp-content/uploads/2020/05/CreekVTLogo150x150.png" />
        </div>
        <div className={styles["footer-items"]}>
          <ul>
            <li><a onClick={() => window.scroll(0,0)}>Back To Top</a></li>
            <li><a href="https://creekvt.com/about/">About</a></li>
            <li><a href="https://creekvt.com/contact/">Contact</a></li>
          </ul>
        </div>
        <div className={styles["footer-items"]}>
          <p>Creek VT {new Date().getFullYear()}</p>
          <p>Thanks For Visiting</p>
        </div>
      </footer>
    </>
  );
};

