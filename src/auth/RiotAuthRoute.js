import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/userContext';
import axios from 'axios';
import { Redirect, Route } from 'react-router-dom';
import ScreenLoading from '../components/pug/loading/ScreenLoading';

const getUrlParameter = (name) => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

const RiotAuthRoute = ({component:Component,...rest}) => {

    const {user,saveUser,setUser,cookies} = useContext(UserContext);
    const [isAuthenticated,setIsAuthenticated] = useState(null);
    const code = getUrlParameter('code');
    // const [fetching,setFetching] = useState(true);

    useEffect(()=>{
        if(user.data&&code){

            if(!user.riot_id){
                axios.get(`https://socialsdb.azurewebsites.net/api/riotAuth?code=${code}&&accesstoken=${cookies.access_token}`)
                .then(async (res)=>{
                    console.log(res.data.message);
                    
                    const p = await axios.get(`http://localhost:7071/api/socialsdb?userId=${user.user_id}&&socialName=riot&&socialId=${res.data.message.puuid}`,{timeout:4500}).catch(err=>{
                        console.log('not authenticated');
                    });
                    setUser(u=>({...u,riot_id:res.data.message.puuid}));
                    setIsAuthenticated(true);
                    // console.log(p);
                    
                })
                .catch(err=>{
                    console.log('wrong code');
                    setIsAuthenticated(false);
                    // console.log(err);
                })
            }
            else{
                setIsAuthenticated(true);
            }
        }
        
    },[user])

    if(isAuthenticated===null){
        return <ScreenLoading />
    }


    return (
        <Route {...rest} render={props=><Redirect to={`/?riot_auth=${isAuthenticated}`} />} />
        // <h1>waiting</h1>
    )
}

export default RiotAuthRoute
