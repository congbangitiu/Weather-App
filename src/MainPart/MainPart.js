import classNames from 'classnames/bind';
import styles from './MainPart.module.scss';
import React, { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function MainPart({ selectedCity, onDegreeChange }) {
    const [weatherData, setWeatherData] = useState(null);
    const [degree, setDegree] = useState('metric');
    const [isCelsiusClicked, setIsCelsiusClicked] = useState(true);
    const [isFahrenheitClicked, setIsFahrenheitClicked] = useState(false);

    const handleCelsiusClick = () => {
        setDegree('metric');
        setIsCelsiusClicked(true);
        setIsFahrenheitClicked(false);
        onDegreeChange('metric');
    };

    const handleFahrenheitClick = () => {
        setDegree('imperial');
        setIsCelsiusClicked(false);
        setIsFahrenheitClicked(true);
        onDegreeChange('imperial');
    };

    useEffect(() => {
        fetch(
            `https://api.openweathermap.org/data/2.5/forecast?appid=5caf59265a678ca70e57d4763ad8ddcc&q=${selectedCity}&units=${degree}`
        )
            .then((res) => res.json())
            .then((res) => {
                setWeatherData(res.list);
            })
            .catch((error) => {
                console.error('Error fetching weather data:', error);
            });
    }, [selectedCity, degree]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('switchTemperatureBtns')}>
                    <p
                        className={cx('Cdegree', {
                            active: isCelsiusClicked,
                        })}
                        onClick={handleCelsiusClick}
                    >
                        &deg;C
                    </p>
                    <p
                        className={cx('Fdegree', {
                            active: isFahrenheitClicked,
                        })}
                        onClick={handleFahrenheitClick}
                    >
                        &deg;F
                    </p>
                </div>

                <div className={cx('container')}>
                    <div className={cx('futureDays')}>
                        {weatherData &&
                            weatherData.slice(1, 6).map((dayData, index) => {
                                const currentDate = new Date();
                                const nextDate = new Date(currentDate.getTime() + (index + 1) * 24 * 60 * 60 * 1000);
    
                                return (
                                    <div className={cx('nextDay')} key={index}>
                                        <p>{index === 0 ? 'Tomorrow' : nextDate.toLocaleDateString()}</p>
                                        <img
                                            className={cx('weatherIcon')}
                                            src={`https://openweathermap.org/img/wn/${weatherData[index]?.weather[0]?.icon}@2x.png`}
                                            alt="Weather icon"
                                        />
                                        <div className={cx('temperature')}>
                                            <p>
                                                {Math.round(dayData.main.temp_max)}&deg;{degree === 'metric' ? 'C' : 'F'}
                                            </p>
                                            <p>
                                                {Math.round(dayData.main.temp_min)}&deg;{degree === 'metric' ? 'C' : 'F'}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
    
                    <div className={cx('todayHightLights')}>
                        <h1>Today&rsquo;s Highlights </h1>
                        <div className={cx('factorsContainer')}>
                            <div className={cx('factors')}>
                                <div className={cx('factor', 'wind')}>
                                    <p className={cx('status')}>Wind status</p>
                                    <div className={cx('statistics')}>
                                        <p className={cx('value')}>{weatherData?.[0]?.wind?.speed}</p>
                                        <p className={cx('unit')}>mph</p>
                                    </div>
                                    <div className={cx('navigation')}>
                                        <icon className={cx('navigationIcon')}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="25"
                                                height="25"
                                                viewBox="0 0 25 25"
                                                fill="none"
                                            >
                                                <g clip-path="url(#clip0_1_98)">
                                                    <path
                                                        d="M8.01348 17.2203L9.61278 5.38071C9.70167 4.72534 10.5505 4.5087 10.9377 5.04729L13.4776 8.52307C13.603 8.68917 13.7882 8.79609 13.9948 8.8217L18.2749 9.28342C18.9312 9.35586 19.1717 10.1929 18.6486 10.5975L9.19484 17.9023C8.67811 18.3107 7.92459 17.8757 8.01348 17.2203Z"
                                                        fill="#E7E7EB"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_1_98">
                                                        <rect
                                                            width="17.6966"
                                                            height="17.6966"
                                                            fill="white"
                                                            transform="translate(15.6997 24.7079) rotate(-150)"
                                                        />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </icon>
                                        <p>WSW</p>
                                    </div>
                                </div>
    
                                <div className={cx('factor', 'humidity')}>
                                    <p className={cx('status')}>Humidity</p>
                                    <div className={cx('statistics')}>
                                        <p className={cx('value')}>{weatherData?.[0]?.main?.humidity}</p>
                                        <p className={cx('unit')}>%</p>
                                    </div>
                                    <div className={cx('metricBar')}>
                                        <div className={cx('number')}>
                                            <p>0</p>
                                            <p>50</p>
                                            <p>100</p>
                                        </div>
                                        <div className={cx('scale')}>
                                            <div
                                                className={cx('level')}
                                                style={{ width: `${weatherData?.[0]?.main?.humidity}%` }}
                                            ></div>
                                        </div>
                                        <p>%</p>
                                    </div>
                                </div>
    
                                <div className={cx('factor', 'visibility')}>
                                    <p className={cx('status')}>Visibility</p>
                                    <div className={cx('statistics')}>
                                        <p className={cx('value')}>{weatherData?.[0]?.visibility}</p>
                                        <p className={cx('unit')}>miles</p>
                                    </div>
                                </div>
    
                                <div className={cx('factor', 'air')}>
                                    <p className={cx('status')}>Air Pressure</p>
                                    <div className={cx('statistics')}>
                                        <p className={cx('value')}>{weatherData?.[0]?.main?.pressure}</p>
                                        <p className={cx('unit')}>mb</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPart;
