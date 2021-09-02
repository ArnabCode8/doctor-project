import React from 'react';
import './docProfile.css';
import RatingPanel from '../RatingComps/RatingPanel';
import CommentList from '../commentComps/CommentList';
import baseLink from '../NesInfo';

export default class DocProfile extends React.Component
{
    constructor(props)
    {
        //doccon is pending
        super(props);
        this.state = {

            docid: this.props.docid,
            docname: "",
            docaddress: "",
            cityname: "",
            exps: ""
        };
    }

    componentDidMount()
    {

        var that = this;

        console.log("doc id received : " + this.state.docid);
        var actionStr = baseLink + "singledoc/" + this.state.docid;
        fetch(actionStr,{

            method: "GET",

        }).then(function(response){

            return response.text();

        }).then(function(val){

            var jsonObj = JSON.parse(val);
            var doc = jsonObj[0];
            var cname = jsonObj[1];
            var expStr = jsonObj[2];

            console.log(doc);
            console.log(cname);
            console.log(expStr);

            that.setState({

                docname: doc.docname,
                docaddress: doc.docaddress,
                cityname: cname,
                exps: expStr
            })
            
        });
        
    }

    render()
    {
        return (

            <div id = 'docProfileContainer'>
            <div id = 'docProfile'>    
            {
                this.state.docname != ""?
                <>
                <p id = 'docProfileDocName'>{this.state.docname}</p>
                <hr/>
                <p id = 'docProfileDocAddress'>Address : {this.state.docaddress} : {this.state.cityname}</p>
                <p id = 'docProfileDocExps'>Specialises in : {this.state.exps}</p>
                </>
                :
                null

            }
            </div>
            <RatingPanel docid = {this.state.docid} />
            <CommentList docid = {this.state.docid} />
            </div> 

        );
    }
}