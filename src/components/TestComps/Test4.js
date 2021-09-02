import React, { useState } from 'react';
import Test5 from './Test5';

const dataContext = React.createContext(0);

const Test4 = () => {


    const [count,setCount] = useState(0);

    return (

        <dataContext.Provider value = {count}>
       
        <p>This is in the 1st program</p>
        <hr/>
        <button onClick={()=>setCount(count + 1)}>inc count</button>
        <Test5 />
        </dataContext.Provider>   

    );

};

export default Test4;
export { dataContext };