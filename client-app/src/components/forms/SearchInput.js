import React from 'react'
import { Input } from 'antd'
const { Search } = Input;

const SearchInput = ({keyword, setKeyword}) => {
    
    const handleSearchInput = (e) => {
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase());
    }


    return (
        <div className='container p-1'>
            <Search
                value={keyword}
                onChange={handleSearchInput}
                placeholder="Search Category"
                enterButton="Search" size="large"
                style={{ margin: "10px 0px 10px 0px" }} />
        </div>
    )
}

export default SearchInput