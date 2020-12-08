import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';

const Logo = () =>{
    return(
        <div className="ma4 mt0">
            <Tilt className="Tilt b2 shadow-2" options={{max: 55}} style={{height: 150, width: 150, background: 'linear-gradient(89deg, #ff5edf 0%, #04c8de 100%'}}>
                <div className="Tilt-inner pa3">
                    <img alt='logo' src={brain} style={{padding: '5px'}}/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;