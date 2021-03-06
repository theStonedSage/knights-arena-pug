import React, { useContext, useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../contexts/userContext';
import ScreenLoading from '../components/pug/loading/ScreenLoading';

const getUrlParameter = (name) => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

const setCookiep = ({access_token,expires_in,refresh_token},setCookie)=>{
    setCookie('access_token', access_token, { path: '/',maxAge:expires_in });
    setCookie('refresh_token', refresh_token, { path: '/',maxAge:expires_in });
    console.log('cookie set');
}

const DiscordAuthRoute = ({component:Component,...rest}) => {

    const {user,setCookie,cookies} = useContext(UserContext);
    const [isAuthenticated,setIsAuthenticated] = useState(null);
    const code = getUrlParameter('code');

    useEffect(()=>{
        if(cookies.access_token&&user.discord_id){
            setIsAuthenticated(true);
        }
    },[cookies,user])

    useEffect(()=>{
        const params = new URLSearchParams()
        params.append('client_id', '814169905368399902')
        params.append('client_secret', 'SsScyEUB6TmJbW-NX8XPrDibbV6tnNl3')
        params.append('grant_type', 'authorization_code')
        params.append('code', `${code}`)
        params.append('redirect_uri', 'https://knightsarena.com/discord')
        params.append('scope', 'identify')

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        if(code){
            axios.post('https://discord.com/api/v6/oauth2/token', params, config)
            .then((res) => {
                // console.log(res);
                if(res){
                    setCookiep(res.data,setCookie);
                    
                }
                else {
                    console.log('cookie not set')
                    setIsAuthenticated(false);
                }
                
            }).catch((err) => {setIsAuthenticated(false); console.log(err);})
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
