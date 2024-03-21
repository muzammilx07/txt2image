import React, { useState } from 'react';
import './main.css';

const Main = () => {
    const [inputValue, setInputValue] = useState('');
    const [imageSrc, setImageSrc] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch(
                "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
                {
                    headers: { Authorization: "Bearer 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" },
                    method: "POST",
                    body: JSON.stringify({ inputs: inputValue }),
                }
            );
            const imageBlob = await response.blob();
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageSrc(imageUrl);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleButtonClick = () => {
        fetchData();
    };

    return (
        <div className="container">
            <h1 className="title">Image Generator</h1>
            <div className="input-container">
                <input
                    className="input-field"
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter your input"
                />
                <button className="generate-button" onClick={handleButtonClick}>Generate Image</button>
            </div>
            {imageSrc && (
                <div className="image-container">
                    <h2 className="image-title">Generated Image</h2>
                    <img className="generated-image" src={imageSrc} alt="Generated Image" />
                </div>
            )}
        </div>
    );
};

export default Main;
