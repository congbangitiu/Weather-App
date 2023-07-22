import './App.css';
import MainPart from './MainPart';
import SearchPart from './SearchPart';
import SidePart from './SidePart';
import React, { useState } from 'react';

function App() {
    const [isSearchPartVisible, setSearchPartVisible] = useState(false);
    const [selectedCity, setSelectedCity] = useState('');
    const [currentDegree, setCurrentDegree] = useState('metric');

    const handleSearchButtonClick = () => {
        setSearchPartVisible(true);
    };

    const handleClosedButtonClick = () => {
        setSearchPartVisible(false);
    };

    const handleCitySelect = (cityName) => {
        setSelectedCity(cityName); // Cập nhật tên thành phố được chọn từ SearchPart
    };

    const handleDegreeChange = (degree) => {
        setCurrentDegree(degree);
    };

    return (
        <div className="App">
            {!isSearchPartVisible && (
                <SidePart
                    onSearchButtonClick={() => handleSearchButtonClick()}
                    selectedCity={selectedCity}
                    degree={currentDegree}
                />
            )}
            {isSearchPartVisible && (
                <SearchPart onCloseButtonClick={() => handleClosedButtonClick()} onCitySelect={handleCitySelect} />
            )}
            <MainPart selectedCity={selectedCity} onDegreeChange={handleDegreeChange} />
        </div>
    );
}

export default App;
