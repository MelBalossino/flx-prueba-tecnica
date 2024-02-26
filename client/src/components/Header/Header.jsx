import React from "react";
import styles from "./Header.module.css";
import logo from "../../../public/img/logo-flexxus.png";

const Header = () => {
    return (
        <header className={styles.header}>
            <img src={logo} alt="Flexxus logo" className={styles.logo} />
        </header>
    )
}

export default Header;