import React, { useState } from "react";
import { Input } from "antd";
import { useDispatch } from "react-redux";
import { searchUser } from "../../redux/actions/usersActions";
import styles from "./SearchUser.module.css";

const { Search } = Input;

const SearchUser = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const onSearch = (value) => {
        setSearchTerm(value);
        dispatch(searchUser(value));
    };

    const onChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const onClearSearch = () => {
        setSearchTerm("");
        dispatch(searchUser(""));
    };

    const onFocus = () => {
        setIsFocused(true);
    };

    const onBlur = () => {
        setIsFocused(false);
    };

    return (
        <div className={styles.searchContainer}>
            <style>
                {`
                .ant-input-group-addon button.ant-btn {
                    background-color: transparent !important;
                    color: #494848 !important;
                    border: 1px solid #cdc8c8 !important;
                }
                `}
            </style>
            <Search
                placeholder={isFocused ? "search text" : "Buscar usuarios"}
                onSearch={onSearch}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                allowClear
                enterButton
                className={styles.searchInput}
            />
        </div>
    );
};

export default SearchUser;
