import React from 'react';
import spinner from '../images/ZZ5H.gif'
function Spinner(props) {
    return (
        <React.Fragment>
            <img src={spinner} alt="not found" className='d-block m-auto' style={{ width: '50px', height: '50px' }} />
        </React.Fragment>
    );
}

export default Spinner;