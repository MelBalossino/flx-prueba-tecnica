import React from "react";
import Header from "../../components/Header/Header";
import UserTable from "../../components/UserTable/UserTable";
import UsersControlPanel from "../../components/UsersControlPanel/UsersControlPanel";

const Home = () => {
    return (
        <>
            <Header />
            <UsersControlPanel />
            <UserTable />
        </>
    );
};

export default Home;
