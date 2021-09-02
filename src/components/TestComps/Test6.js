import React, { useContext, useEffect, useState } from 'react';
import { dataContext } from './Test4';

function Test6()
{

    const newData = useContext(dataContext);
    const [name,setName] = useState("Arnab Das");

    useEffect(()=>{

        console.log("calling use effect");
        setName("Manab Kishore Das");

    },[]);

    const changeName = () => {

        window.alert("change name is called");
        setName("Renu Das");

    }
    

    return (

        <>
        <h1>Count : {newData}</h1>
        <h2>My name is {name}</h2>
        <button onClick={()=>changeName()}>click</button>
        </>

    );
}

export default Test6;