import React from "react";
import styles from "./Home.module.css";
import Header from "../../components/Header/Header";
import UserTable from "../../components/UserTable/UserTable";
import AddUserButton from "../../components/AddUserButton/AddUserButton";
import SearchUser from "../../components/SearchUser/SearchUser";

const Home = () => {
    return (
        <>
            <Header />
            <SearchUser />
            <AddUserButton classname={styles.addButton} />
            <UserTable />
        </>
    );
};

export default Home;
