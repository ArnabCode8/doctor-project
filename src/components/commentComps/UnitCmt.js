import React from 'react'
import './unitCmt.css';
export default class UnitCmt extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {

            cmtid: this.props.comment.cmtid,
            viscon: this.props.comment.viscon,
            visname: this.props.comment.visname,
            docid: this.props.comment.docid,
            date: this.props.comment.date,
            cmt: this.props.comment.cmt,
        };
    }

    render()
    {
        return (

            <div className = 'unitCmt'>
               <p className = 'cmtInfo'>By {this.state.visname} on {this.state.date}</p>
               <hr/>
               <p className = 'cmtText'>{this.state.cmt}</p>
            </div>    

        );
    }
}