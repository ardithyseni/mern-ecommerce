import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { search } = useSelector((state) => ({ ...state }));
    const { text } = search;

    const handleSearchChange = (e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: {text: e.target.value},
        });
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        history.push(`/shop/?${text}`);
    };

    return (
        <form
            className="form-inline my-2 my-lg-0"
            onSubmit={handleSearchSubmit}
        >
            <input
            onChange={handleSearchChange}
                type="search"
                value={text}
                className="form-control mr-sm-2"
                placeholder="Search"
            />
            <SearchOutlined onClick={handleSearchSubmit} size='large' style={{ cursor: "pointer" }}/>
        </form>
    );
};

export default Search;
