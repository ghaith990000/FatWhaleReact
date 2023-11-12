import React from 'react';
import styles from './../styles/search.module.css';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';

const SearchCustom = ({onSearch}) => {
    const handleInputChange = (event) => {
        const searchTerm = event.target.value;
        // onSearch(searchTerm);
    }

    return (
        <div className={styles.searchContainer}>
            <IconButton className={styles.searchIcon}>
                <SearchIcon />
            </IconButton>
            <input type="text" placeholder="Search..." className={styles.searchInput} onChange={handleInputChange} />
        </div>
    )
}

export default SearchCustom;