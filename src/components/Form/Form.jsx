import { React, useEffect, useState, useCallback } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import './Form.jsx';
export const Form =()=>{
    const [country,setCountry] = useState("");
    const [city,setCity] = useState("");
    const [subject,setSubject] = useState("");
    const {tg} = useTelegram();

    const onSendData = useCallback(()=>{
        const data = {
            country, city, subject
        }
       tg.sendData(JSON.stringify(data))
    }, [city, country, subject])

    useEffect(()=>{
        tg.onEvent('mainButtonClicked', onSendData)
        return() =>{
            tg.offEvent('mainButtonClicked', onSendData)
        }
    })
    useEffect(()=>{
        tg.MainButton.setParams({
            text:"отправить данные"
        })
    }, [])
    useEffect(()=>{
        if (!country || !city){
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [country, city])

    const onChangeCity = (e) =>{
        setCity(e.target.value)
    }
    const onChangeCountry = (e) =>{
        setCountry(e.target.value)
    }
    const onChangeSubject = (e) =>{
        setSubject(e.target.value)
    }
    return(
        <>
        <h3>Введите ваши данные:</h3>
        <input
        className='input'
        type = "text"
        placeholder='Город'
        value={city}
        onChange = {onChangeCity}
        />
        <input
        className='input'
        type = "text"
        placeholder='Страна'
        value={country}
        onChange = {onChangeCountry}
        />
        <select value={subject} onChange={onChangeSubject} className='select'>
            <option value={"legal"}>Физ.лицо</option>
            <option value={"legal"}>Юр.лицо</option>
        </select>
        </>
    )
}