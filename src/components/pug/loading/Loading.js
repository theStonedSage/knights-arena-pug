import React from 'react'
import Loader from 'react-loader-spinner';

const Loading = () => {
    return (
        <div className="home-container">
            <div className="home-wrapper">
                <h4>KNIGHTS ARENA</h4>  
                <h1>TEN PLAYER PUGS</h1>

                <p>TO PLAY IN OUR PUG TOURNAMNETS FOLLOW THE STEPS BELOW</p>

                <Loader
                    style={{margin:'5rem auto'}}
                    type="Bars"
                    color="#00BFFF"
                    height={100}
                    width={100}
                />
            </div>
        </div>
    )
}

export default Loading
