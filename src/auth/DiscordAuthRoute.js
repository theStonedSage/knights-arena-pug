import React, { useContext, useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../contexts/userContext';
import ScreenLoading from '../components/pug/loading/ScreenLoading';

const origin = "https://socialsdb.azurewebsites.net";

const getUrlParameter = (name) => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

const setCookiep = ({access_token,expires_in,refresh_token},setCookie)=>{
    
    if(access_token) setCookie('access_token', access_token, { path: '/',maxAge:expires_in });
    if(refresh_token) setCookie('refresh_token', refresh_token, { path: '/',maxAge:expires_in });
    console.log('cookie set');
}

const DiscordAuthRoute = ({component:Component,...rest}) => {

    const {user,setCookie,cookies} = useContext(UserContext);
    const [isAuthenticated,setIsAuthenticated] = useState(null);
    const code = getUrlParameter('code');

    useEffect(()=>{
        if(cookies.access_token&&user.discord_username){
            if(user.dicord_id) setIsAuthenticated(true);
            else {console.log('nene1'); setIsAuthenticated(false);}
        }
        
    },[cookies,user])

    useEffect(()=>{
        if(code){
            axios.get(`${origin}/api/discord?code=${code}`,{timeout:2000})
            .then((res)=>{
                console.log(res.data)
                if(res.data){
                    setCookiep(res.data,setCookie);
                    
                }
                else{
                    console.log('setting false');
                    setIsAuthenticated(false)
                }   
                
            })
            .catch(err=>{
                console.log('nene2'); 
                setIsAuthenticated(false);
                console.log(err)
            })
        }
        
    },[])

    if(isAuthenticated===null){
        //show loading screen
        return <ScreenLoading />
    }

    return (
        <Route {...rest} render={props=><Redirect to={`/?discord_auth=${isAuthenticated}`} />}  />
    )
}

export default DiscordAuthRoute
