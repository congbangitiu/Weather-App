import classNames from 'classnames/bind';
import styles from './SearchPart.module.scss';
import React, { useState, useEffect, useRef } from 'react';
import { useDebounce } from '../hooks';
import * as searchService from '../services/searchService';

const cx = classNames.bind(styles);

function SearchPart({ onCloseButtonClick, onCitySelect }) {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [searchedCities, setSearchedCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [hoveredCity, setHoveredCity] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const debouncedValue = useDebounce(searchValue, 500);
    const inputRef = useRef();

    const handleClosedButtonClick = () => {
        onCloseButtonClick(false);
    };

    const handleInitialBlank = (e) => {
        const searchInput = e.target.value;
        if (searchInput.trim() || !e.nativeEvent.data || e.nativeEvent.data !== ' ') {
            setSearchValue(searchInput);
        }
    };

    const handleInputChange = (value) => {
        if (value !== searchValue) {
            setSearchValue(value);
        }

        // Lọc danh sách thành phố dựa trên kí tự nhập vào
        const filteredCities = searchResult.reduce((acc, country) => {
            const citiesWithChar = country.cities.filter((city) => city.toLowerCase().startsWith(value.toLowerCase()));
            return [...acc, ...citiesWithChar];
        }, []);

        setFilteredCities(filteredCities);
    };

    const handleSearchButtonClick = (event) => {
        event.preventDefault(event);
        const filteredCities = searchResult.flatMap((country) =>
            country.cities.filter((city) => city.toLowerCase().includes(searchValue.toLowerCase())),
        );
        setSearchedCities(filteredCities);
        setIsSearching(true);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchButtonClick(e);
        }
    };

    const handleCityClick = (cityName) => {
        setSelectedCity(cityName);
        onCitySelect(encodeURIComponent(cityName)); // Mã hóa tên thành phố trước khi truyền lên App component
        onCloseButtonClick();
    };

    const handleCityHoverIn = (cityName) => {
        setHoveredCity(cityName);
    };

    const handleCityHoverOut = () => {
        setHoveredCity(null);
    };

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchAPI = async () => {
            const result = await searchService.search(debouncedValue);
            setSearchResult(result);
        };
        fetchAPI();
    }, [debouncedValue]);

    useEffect(() => {
        fetch('https://countriesnow.space/api/v0.1/countries')
            .then((res) => res.json())
            .then((res) => {
                setSearchResult(res.data);

                // Lọc danh sách thành phố dựa trên kí tự nhập vào
                const filteredCities = res.data.reduce((acc, country) => {
                    const citiesWithChar = country.cities.filter((city) =>
                        city.toLowerCase().startsWith(searchValue.toLowerCase()),
                    );
                    return [...acc, ...citiesWithChar];
                }, []);

                setFilteredCities(filteredCities);
                setSelectedCity('');
            });
    }, [searchValue, searchResult]);

    // Đặt giới hạn 1 phần chữ hiện ra khi tên quá dài -> ví dụ "southern ..."
    const isCityNameTooLong = (cityName) => {
        return cityName.length > 50;
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <icon className={cx('closedBtnCover')} onClick={() => handleClosedButtonClick()}>
                    <svg
                        className={cx('closedBtn')}
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                    >
                        <g clip-path="url(#clip0_1_223)">
                            <path
                                d="M24.4 7.61293C23.88 7.09293 23.04 7.09293 22.52 7.61293L16 14.1196L9.47996 7.59959C8.95996 7.07959 8.11996 7.07959 7.59996 7.59959C7.07996 8.11959 7.07996 8.9596 7.59996 9.4796L14.12 15.9996L7.59996 22.5196C7.07996 23.0396 7.07996 23.8796 7.59996 24.3996C8.11996 24.9196 8.95996 24.9196 9.47996 24.3996L16 17.8796L22.52 24.3996C23.04 24.9196 23.88 24.9196 24.4 24.3996C24.92 23.8796 24.92 23.0396 24.4 22.5196L17.88 15.9996L24.4 9.4796C24.9066 8.97293 24.9066 8.1196 24.4 7.61293Z"
                                fill="#E7E7EB"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_1_223">
                                <rect width="32" height="32" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </icon>

                <div className={cx('search')}>
                    <div className={cx('searchInput')}>
                        <icon>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <g clip-path="url(#clip0_1_215)">
                                    <path
                                        d="M15.5 14H14.71L14.43 13.73C15.63 12.33 16.25 10.42 15.91 8.39002C15.44 5.61002 13.12 3.39002 10.32 3.05002C6.09001 2.53002 2.53002 6.09001 3.05002 10.32C3.39002 13.12 5.61002 15.44 8.39002 15.91C10.42 16.25 12.33 15.63 13.73 14.43L14 14.71V15.5L18.25 19.75C18.66 20.16 19.33 20.16 19.74 19.75C20.15 19.34 20.15 18.67 19.74 18.26L15.5 14ZM9.50002 14C7.01002 14 5.00002 11.99 5.00002 9.50002C5.00002 7.01002 7.01002 5.00002 9.50002 5.00002C11.99 5.00002 14 7.01002 14 9.50002C14 11.99 11.99 14 9.50002 14Z"
                                        fill="#616475"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1_215">
                                        <rect width="24" height="24" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </icon>
                        <input
                            ref={inputRef}
                            value={searchValue}
                            type="text"
                            placeholder="search location"
                            spellCheck={false}
                            onKeyDown={handleKeyDown}
                            onChange={(e) => {
                                if (e.target.value !== ' ' || searchValue.trim()) {
                                    handleInitialBlank(e);
                                    handleInputChange(e.target.value);
                                }
                            }}
                        />
                    </div>

                    <button
                        className={cx('searchBtn')}
                        disabled={!searchValue}
                        onClick={(e) => handleSearchButtonClick(e)}
                    >
                        Search
                    </button>
                </div>

                <div className={cx('results')}>
                    {isSearching ? (
                        searchedCities.length > 0 ? (
                            searchedCities.map((city, index) => (
                                <div
                                    className={cx('city')}
                                    key={index}
                                    onClick={() => handleCityClick(city)}
                                    onMouseEnter={() => handleCityHoverIn(city)}
                                    onMouseLeave={handleCityHoverOut}
                                >
                                    <div className={cx('cityNameContainer')}>
                                        <p
                                            className={cx('cityName', {
                                                'long-name': isCityNameTooLong(city),
                                            })}
                                        >
                                            {city}
                                        </p>
                                    </div>
                                    <icon>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <path
                                                d="M9.29 15.88L13.17 12L9.29 8.11998C8.9 7.72998 8.9 7.09998 9.29 6.70998C9.68 6.31998 10.31 6.31998 10.7 6.70998L15.29 11.3C15.68 11.69 15.68 12.32 15.29 12.71L10.7 17.3C10.31 17.69 9.68 17.69 9.29 17.3C8.91 16.91 8.9 16.27 9.29 15.88Z"
                                                fill="#616475"
                                            />
                                        </svg>
                                    </icon>
                                </div>
                            ))
                        ) : (
                            <p className={cx('noResult')}>There is no result ...</p>
                        )
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default SearchPart;
