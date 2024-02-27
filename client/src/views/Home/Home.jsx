import React from "react";
import styles from "./Home.module.css";
import Header from "../../components/Header/Header";
import UserTable from "../../components/UserTable/UserTable";
import AddUserButton from "../../components/AddUserButton/AddUserButton";

const Home = () => {
    return (
        <>
            <Header />
            <AddUserButton classname={styles.addButton} />
            <UserTable />
        </>
    );
};

export default Home;
