import React,{useEffect,useContext} from 'react'
import { useState } from 'react';
import { UserContext } from '../../../contexts/userContext';
import './styles.css';

const Connect = ({text,button,color,link,active})=>{
    return(
        <div  className={`loginBanner`}>
            <p style={{color:`${active?'#fff':'grey'}`}} >{text}</p>
            <a style={{color:`${active?'#fff':'grey'}`}} href={active?link:'#'} className={active?`btn-${color}`:'btn-grey'}>
                {button}
            </a>
        </div>
    )
}

const Home = () => {

    const [chance,setChance] = useState('discord');
    const {user} = useContext(UserContext);

    useEffect(()=>{
        if(user&&user.discord_id) setChance('riot');
    },[user])

    return (
        <div className="home-container">
            <div className="home-wrapper">
                <h4>KNIGHTS ARENA</h4>  
                <h1>TEN PLAYER PUGS</h1>

                <p>TO PLAY IN OUR PUG TOURNAMNETS FOLLOW THE STEPS BELOW</p>


                <Connect 
                    active={chance==='discord'}
                    text="LOGIN WITH DISCORD"  
                    color='blue'
                    button={user&&user.discord_id?'LOGGEDIN':'LOGIN'}
                    link="https://discord.com/api/oauth2/authorize?client_id=814169905368399902&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdiscord&response_type=code&scope=identify"
                />

                <i className={`arrow down ${chance==='riot'&&'borderActive'}`} />
                <br />  
                <i style={{marginTop:'-0.8rem'}} className={`arrow down ${chance==='riot'&&'borderActive'}`} />

                <Connect 
                    active={chance==='riot'}
                    text="LOGIN WITH RIOT" 
                    color='red'
                    button={user&&user.riot_id?'CONNECTED':'CONNECT'}
                />


            </div>
        </div>
    )
}

export default Home
