import React from 'react';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) =>{
    return(
        <div>
            <p className='f4'>This magic app will detect faces in pictures. Give it a try</p>
            <div className="centered">
                <div className="pa4 form centered br3 shadow-5">
                    <input type='text' className='f4 pa2 w-70 center' onChange={onInputChange}/>
                    <button className='grow f4 link w-30 ph3 pv2 dib white bg-light-purple pointer' onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
        
    )
}

export default ImageLinkForm;