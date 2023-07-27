import classNames from 'classnames/bind';
import styles from './SidePart.module.scss';
import diacritic from 'diacritic';
import React, { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function SidePart({ onSearchButtonClick, selectedCity, degree, onCurrentLocationClick, formattedCurrentCity, isSelectedCity, setIsSelectedCity }) {
    
    const [weatherData, setWeatherData] = useState(null);

    const handleSearchButtonClick = () => {
        onSearchButtonClick(true);
    };

    // const removeDiacritics = (inputString) => {
    //     return diacritic.clean(inputString);
    // };

    const handleCurrentLocationClick = () => {
        onCurrentLocationClick();
        setIsSelectedCity(!isSelectedCity);
    };

    useEffect(() => {
        fetch(
            `https://api.openweathermap.org/data/2.5/forecast?appid=5caf59265a678ca70e57d4763ad8ddcc&q=${
                isSelectedCity ? selectedCity : formattedCurrentCity
            }&units=${degree}`,
        )
            .then((res) => res.json())
            .then((res) => {
                setWeatherData(res.list);
            })
            .catch((error) => {
                console.error('Error fetching weather data:', error);
            });
    }, [isSelectedCity, selectedCity, formattedCurrentCity, degree]);

    const temperature = weatherData?.[0]?.main?.temp;
    const description = weatherData?.[0]?.weather?.[0]?.description;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <button className={cx('searchBtn')} onClick={() => handleSearchButtonClick()}>
                    <icon className={cx('searchIcon')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
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
                    <p>Search for places</p>
                </button>

                <icon className={cx('gpsIcon')} onClick={() => handleCurrentLocationClick()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none">
                        <g clip-path="url(#clip0_1_29)">
                            <path
                                d="M12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8ZM20.94 11C20.48 6.83 17.17 3.52 13 3.06V2C13 1.45 12.55 1 12 1C11.45 1 11 1.45 11 2V3.06C6.83 3.52 3.52 6.83 3.06 11H2C1.45 11 1 11.45 1 12C1 12.55 1.45 13 2 13H3.06C3.52 17.17 6.83 20.48 11 20.94V22C11 22.55 11.45 23 12 23C12.55 23 13 22.55 13 22V20.94C17.17 20.48 20.48 17.17 20.94 13H22C22.55 13 23 12.55 23 12C23 11.45 22.55 11 22 11H20.94ZM12 19C8.13 19 5 15.87 5 12C5 8.13 8.13 5 12 5C15.87 5 19 8.13 19 12C19 15.87 15.87 19 12 19Z"
                                fill="#E7E7EB"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_1_29">
                                <rect width="26" height="26" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </icon>
            </div>

            <div className={cx('body')}>
                {/* mây minh họa */}
                <div className={cx('cloudIcon12')}>
                    <img
                        className={cx('cloudIcon1')}
                        src="https://cdn.pixabay.com/photo/2014/04/02/10/14/cloud-303182_1280.png"
                        alt="Cloud icon"
                    />
                    <img
                        className={cx('cloudIcon2')}
                        src="https://cdn.pixabay.com/photo/2014/04/02/10/14/cloud-303181_1280.png"
                        alt="Cloud icon"
                    />
                </div>

                {/* thời tiết */}
                <img
                    className={cx('weatherIcon')}
                    src={
                        weatherData?.[0]?.weather?.[0]?.icon
                            ? `https://openweathermap.org/img/wn/${weatherData[0]?.weather[0]?.icon}@2x.png`
                            : ''
                    }
                    alt="Weather icon"
                />

                {/* mây minh họa */}
                <div className={cx('cloudIcon34')}>
                    <img
                        className={cx('cloudIcon3')}
                        src="https://cdn.pixabay.com/photo/2014/04/02/10/14/cloud-303182_1280.png"
                        alt="Cloud icon"
                    />

                    <img
                        className={cx('cloudIcon4')}
                        src="https://cdn.pixabay.com/photo/2014/04/02/10/14/cloud-303181_1280.png"
                        alt="Cloud icon"
                    />
                </div>

                <div className={cx('temperature')}>
                    {weatherData !== null && Array.isArray(weatherData) && weatherData.length > 0 ? (
                        <>
                            <h1 className={cx('value')}>{Math.round(temperature)}</h1>
                            <h1 className={cx('unit')}>&deg;{degree === 'metric' ? 'C' : 'F'}</h1>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>

                <h1 className={cx('description')}>{description}</h1>
            </div>

            <div className={cx('footer')}>
                <div className={cx('currentDay')}>
                    <p>Today</p>
                    <p>.</p>
                    <p className={cx('dayMonthYear')}>
                        {weatherData ? new Date(weatherData[0]?.dt * 1000).toLocaleDateString() : ''}
                    </p>
                </div>
                <p className={cx('location')}>
                    <icon className={cx('marker')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <g clip-path="url(#clip0_1_17)">
                                <path
                                    d="M12 2C8.13 2 5 5.13 5 9C5 13.17 9.42 18.92 11.24 21.11C11.64 21.59 12.37 21.59 12.77 21.11C14.58 18.92 19 13.17 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                                    fill="#88869D"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_1_17">
                                    <rect width="24" height="24" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </icon>

                    <p className={cx('name')}>
                        {isSelectedCity ? decodeURIComponent(selectedCity) : decodeURIComponent(formattedCurrentCity)}
                    </p>
                </p>
            </div>
        </div>
    );
}

export default SidePart;
