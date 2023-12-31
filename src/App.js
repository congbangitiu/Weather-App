import './App.css';
import MainPart from './MainPart';
import SearchPart from './SearchPart';
import SidePart from './SidePart';
import React, { useState, useEffect } from 'react';
import diacritic from 'diacritic';

function App() {
    const [isSearchPartVisible, setSearchPartVisible] = useState(false);
    const [selectedCity, setSelectedCity] = useState('');
    const [currentDegree, setCurrentDegree] = useState('metric');
    const [currentCity, setCurrentCity] = useState('');

    const [formattedCurrentCity, setFormattedCurrentCity] = useState();
    const [isSelectedCity, setIsSelectedCity] = useState(false);
    const [isCurrentLocation, setIsCurrentLocation] = useState(false);
    const [isLoading, setLoading] = useState(false);
    

    const handleSearchButtonClick = () => {
        setSearchPartVisible(true);
    };

    const handleClosedButtonClick = () => {
        setSearchPartVisible(false);
    };

    const handleCitySelect = (cityName) => {
        setSelectedCity(cityName); // Cập nhật tên thành phố được chọn từ SearchPart
        setIsSelectedCity(true);
        setIsCurrentLocation(false);
    };

    const handleDegreeChange = (degree) => {
        setCurrentDegree(degree);
    };

    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);

    const removeDiacritics = (inputString) => {
        return diacritic.clean(inputString);
    };

    const handleCurrentLocationClick = () => {
        getUserCoordinates();
    };

    const geolocationAPI = navigator.geolocation;
    const getUserCoordinates = () => {
        if (!geolocationAPI) {
            console.log('Geolocation API is not available in your browser!');
        } else {
            geolocationAPI.getCurrentPosition(
                (position) => {
                    const { coords } = position;
                    setLat(coords.latitude);
                    setLong(coords.longitude);
                    setIsSelectedCity(false);
                    setFormattedCurrentCity(encodeURIComponent(removeDiacritics(currentCity?.city)));
                    // console.log(lat)
                    // console.log(long);
                    // console.log(formattedCurrentCity);
                },
                (error) => {
                    console.log('Something went wrong getting your position!');
                    setLoading(false);
                },
            );
        }
    };

    useEffect(() => {
        if (lat && long) {
            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`)
                .then((res) => res.json())
                .then((res) => {
                    setCurrentCity(res.address);
                    console.log(res.address);
                    setFormattedCurrentCity(encodeURIComponent(removeDiacritics(res.address.city)))
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching location data:', error);
                    setLoading(false);
                });
        }
    }, [lat, long]);

    useEffect(() => {
        if (!isLoading && lat && long) {
            setFormattedCurrentCity(encodeURIComponent(removeDiacritics(currentCity?.city)));
            setIsSelectedCity(false);
        }
        getUserCoordinates();
    }, [isLoading, formattedCurrentCity, lat, long]);

    return (
        <div className="App">
            {!isSearchPartVisible && (
                <SidePart
                    onSearchButtonClick={() => handleSearchButtonClick()}
                    selectedCity={selectedCity}
                    degree={currentDegree}
                    isCurrentLocation={!isSelectedCity}
                    onCurrentLocationClick={handleCurrentLocationClick}
                    formattedCurrentCity={formattedCurrentCity}
                    isSelectedCity={isSelectedCity}
                    setIsSelectedCity={setIsSelectedCity}
                />
            )}
            {isSearchPartVisible && (
                <SearchPart onCloseButtonClick={() => handleClosedButtonClick()} onCitySelect={handleCitySelect} setIsSelectedCity={setIsSelectedCity}/>
            )}
            <MainPart
                selectedCity={selectedCity}
                onDegreeChange={handleDegreeChange}
                isCurrentLocation={!isSelectedCity}
                formattedCurrentCity={formattedCurrentCity}
            />
        </div>
    );
}

export default App;
