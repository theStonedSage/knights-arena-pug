import React,{useEffect,useContext} from 'react'
import { useState } from 'react';
import { UserContext } from '../../../contexts/userContext';
// import Loading from '../loading/Loading';
import Loader from 'react-loader-spinner';

import './styles.css';
import CheckmarkCircle from './checkmark/CheckmarkCircle';

const Success = ({name})=>{
    return(
        <div className="successDiv" style={{}}>
            <CheckmarkCircle />
            <p>Registration succesfull, <span style={{color:'#ffa632',fontWeight:600}}>@{name}</span></p>
            <p>Click <a href="#">here</a> to start playing</p>
        </div>
    )
}

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
        if(user&&user.discord_id&&user.riot_id) setChance('next');
        else if(user&&user.discord_id) setChance('riot');
    },[user])

    return (
        <div className="home-container">
            <div className="home-wrapper">
                <h4>KNIGHTS ARENA</h4>  
                <h1>TEN PLAYER PUGS</h1>

                <p>TO PLAY IN OUR PUG TOURNAMNETS FOLLOW THE STEPS BELOW</p>

                {user.fetching?(
                    <Loader
                        style={{margin:'5rem auto'}}
                        type="Bars"
                        color="#00BFFF"
                        height={100}
                        width={100}
                    />
                ):(chance=='next'?<Success name={user.discord_username} />:(<>
                    <Connect 
                        active={chance==='discord'}
                        text="LOGIN WITH DISCORD"  
                        color='blue'
                        button={user&&user.discord_id?`@${user.discord_username} LOGGEDIN`:'LOGIN'}
                        link="https://discord.com/api/oauth2/authorize?client_id=814169905368399902&redirect_uri=https%3A%2F%2Fknightsarena.com%2Fdiscord&response_type=code&scope=identify%20email"
                    />

                    <i className={`arrow down ${chance==='riot'&&'borderActive'}`} />
                    <br />  
                    <i style={{marginTop:'-0.8rem'}} className={`arrow down ${chance==='riot'&&'borderActive'}`} />

                    <Connect 
                        active={chance==='riot'}
                        text="LOGIN WITH RIOT" 
                        color='red'
                        button={user&&user.riot_id?'CONNECTED':'CONNECT'}
                        link="https://auth.riotgames.com/authorize?client_id=knightsarena&redirect_uri=https://knightsarena.com/cb/rso&response_type=code&scope=openid+offline_access"
                    />
                </>))}

            </div>
        </div>
    )
}

export default Home
