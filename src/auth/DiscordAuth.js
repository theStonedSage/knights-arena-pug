import React, { useEffect,useContext } from 'react'
import Home from '../components/pug/home/Home';
import axios from 'axios';
import { UserContext } from '../contexts/userContext';


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

const DiscordAuth = () => {

    const {user,setCookie} = useContext(UserContext);
    const code = getUrlParameter('code');

    useEffect(()=>{
        const params = new URLSearchParams()
        params.append('client_id', '814169905368399902')
        params.append('client_secret', 'SsScyEUB6TmJbW-NX8XPrDibbV6tnNl3')
        params.append('grant_type', 'authorization_code')
        params.append('code', `${code}`)
        params.append('redirect_uri', 'http://localhost:3000/discord')
        params.append('scope', 'identify')

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        axios.post('https://discord.com/api/v6/oauth2/token', params, config)
        .then((res) => {
            console.log(res);
            if(res){
                console.log(res.data);
                setCookiep(res.data,setCookie);
            }
            else console.log('cookie not set')
        }).catch((err) => { console.log(err);})
    
    })
    return (
        <Home />
    )
}

export default DiscordAuth
