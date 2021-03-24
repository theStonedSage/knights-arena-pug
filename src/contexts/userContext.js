import Axios from 'axios';
import React,{useEffect} from 'react';
import { useCookies } from 'react-cookie';

const UserContext = React.createContext();

const UserProvider = UserContext.Provider;

const UserContextProvider = (props)=>{
    const [cookies, setCookie,removeCookie] = useCookies(['access_token','refresh_token']);
    const [user,setUser] = React.useState({data:false,fetching:true});
    
    useEffect(()=>{
        console.log(user);
    },[user]);
    
    useEffect(()=>{
        // console.log(cookies);
        if(cookies.access_token&&cookies.refresh_token){
           
                Axios.get( `https://discordapp.com/api/users/@me`, {headers: {Authorization: `Bearer ${cookies.access_token}`}}).then(async res=>{

                console.log('cookie enter');
                console.log(res.data);

                const player = await Axios.get(`http://localhost:7071/api/dbcheck?email=${res.data.email}&&username=${res.data.username}`,{timeout:45000}).catch((err)=>{
                    console.log('err occured');
                });

                console.log(player.data.message.id);

                //add discord social connection
                const d = await Axios.get(`http://localhost:7071/api/socialsdb?userId=${player.data.message.id}&&socialName=discord&&socialId=${res.data.id}`,{timeout:45000}).catch(err=>{
                    console.log('err occured');
                })
                
                console.log(d);
                //check for riot social connection
                const p = await Axios.get(`http://localhost:7071/api/socialsdb?userId=${player.data.message.id}&&socialName=riot&&get=true`,{timeout:4500}).catch(err=>{
                        console.log('not authenticated');
                });

                setUser({
                    data:true,
                    fetching:false,
                    user_id:player.data.message.id,
                    // discord_id:d.data.message?d.data.message.id:'',
                    discord_id:'hello',
                    discord_username:res.data.username,
                    riot_id:p.data.message?p.data.message.id:'',
                }) 
                 
            }).catch(err=>{
                //cookies are not correct so delete them
                setUser({data:false,fetching:false});
                removeCookie('access_token');
                removeCookie('refresh_token');
            }) 
        }
        else setUser({data:false,fetching:false});
        // console.log('user is set');
        
    },[cookies]);

    const saveUser = (e)=>{
        setUser(e);
    }


    return (
        <UserProvider value = {{user,saveUser,setCookie,cookies,removeCookie,setUser}} >
            {props.children}
        </UserProvider>
    )
}

export {UserContext,UserContextProvider};