import {React} from 'react';
import './Header.css';
import {useTelegram} from '../../hooks/useTelegram'
export const Header =()=>{
   const { user, onClose} = useTelegram();
     return(
        <>
        <span className = 'userNmae'>
            {user?.username}
         </span>      
      </>

     )
}