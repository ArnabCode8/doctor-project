import React from 'react';
import Test3 from './Test3';

export default class Test2 extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (

            <>
            <p>This is at Test2</p>
            <hr/>
            <Test3 />
            </>
        )
    }
}