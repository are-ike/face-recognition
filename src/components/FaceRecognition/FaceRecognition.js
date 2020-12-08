import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageURL, box}) =>{
    return(
        <div className='centered ma'>
            <div className='absolute mt2'>
                <img id='image' width='300px' height='auto' alt="" src={imageURL}/>
                <div style={{top: box.topRow, bottom: box.bottomRow, left: box.leftCol, right: box.rightCol}} className="bounding-box"></div>
            </div>
        </div>
        
    )
}

export default FaceRecognition;