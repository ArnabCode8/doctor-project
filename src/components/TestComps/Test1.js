import React from 'react';
import Test2 from './Test2';

const NameContext = React.createContext("Arnab Das");

export default class Test1 extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {

            name: "No name"

        }

    }

    render()
    {
        return (

            <NameContext.Provider value = {this.state.name}>
            <p>this is test1</p>
            <hr/>    
            <Test2/> 
            <button onClick={()=>this.setState({name:"Ashis Das"})}>click me</button>
            </NameContext.Provider>    

        );
    }
}

export { NameContext }