import React from 'react';

export default function StepperControl({ handleClick, currentStep, steps, handleSubmit, isFilled  }) {
    return (
        <div className='container flex justify-around mt-4 mb-8'>
            <button
                onClick={() => handleClick("back")}
                className={`bg-white text-slate-400 uppercase py-2 px-4 rounded-xl 
                font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700
                hover:text-white transition duration-200 ease-iniout
                ${currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""} `} >
                Back
            </button>
            {currentStep === steps.length -1 ? (
                // Display the Confirm button if it's the last step
                <button
                    onClick={handleSubmit}
                    disabled ={!isFilled}
                    className={`bg-green-500 text-white uppercase py-2 px-4 rounded-xl 
                    font-semibold cursor-pointer hover:bg-slate-700
                    hover:text-white transition duration-200 ease-iniout
                    ${isFilled ? "" : "opacity-50 cursor-not-allowed"}`}> {/* Disable button if form is not filled */}
                    
                    Confirm
                </button>
            ) : (
                // Otherwise, display the Next button
                <button
                    onClick={() => handleClick("next")}
                    disabled ={!isFilled}
                    className={`bg-green-500 text-white uppercase py-2 px-4 rounded-xl 
                    font-semibold cursor-pointer hover:bg-slate-700
                    hover:text-white transition duration-200 ease-iniout
                    ${isFilled ? "" : "opacity-50 cursor-not-allowed"}`}> 
                    
                    {/* Disable button if form is not filled */}
                    Next
                </button>
            )}
        </div>
    );
}
