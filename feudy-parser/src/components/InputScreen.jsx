import React from 'react';


function InputScreen({ inputText }) {

    return (
        <>
            <h3>Submit Data Here</h3>
            <textarea rows='20' cols='50' placeholder='Enter your data here...'>{inputText}</textarea>
            <br></br>
            <button type='submit'>Submit</button>
        </>
    )
}

export default InputScreen;
