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

                const p = await Axios.get(`http://localhost:7071/api/dbcheck?dId=${res.data.id}&&accesstoken=${cookies.access_token}`).catch((err)=>{
                    console.log('err occured');
                });
                // console.log('db check exec',l);
                
                setUser({
                    data:true,
                    fetching:false,
                    discord_id:res.data.id,
                    riot_id:'',
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