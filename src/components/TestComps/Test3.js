import React, { useContext } from 'react';
import { NameContext } from './Test1';


export default class Test3 extends React.Component
{
    
    render()
    {
        return (

            <NameContext.Consumer>
            {
                (value) =>{

                    return (

                        <>
                        <p>this is at test 3</p>
                        <hr/>
                        <h2>Name is : {value}</h2>
                        </>

                    );
                }
            }
            </NameContext.Consumer>

        );
    }
}