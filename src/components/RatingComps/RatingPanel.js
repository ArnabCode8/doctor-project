import React from 'react';
import './ratingPanel.css';
import baseLink from '../NesInfo';

//only takes docid as props
export default class RatingPanel extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {

            docid: this.props.docid,
            rateopen: true,
            rate: -1,
            ratecount: -1,
            visfetch: false,
            visfound: false,
            viscon: "",
            visname: "",
            visrate: "3",
            prevvisrate: ""
        };
    }

    componentDidMount()
    {
    
        this.fetchRate();
       //rate and ratecount will be fetched by docid
    }


    fetchRate()
    {
        var that = this;
        var actionStr = baseLink + "docrating/" + this.state.docid;
        fetch(actionStr,{

            method: "GET",

        }).then(function(response){

            return response.text();

        }).then(function(val){

            var jsonObj = JSON.parse(val);
            var rateObj = jsonObj[0];
            
            console.log("fetched rate object : ");
            console.log(rateObj);

            that.setState({

                rate: parseFloat(rateObj['rate']).toFixed(2),
                ratecount: rateObj['count'] 
        
            });  

        });

    }

    openRateBlock()
    {

        var x = prompt("Enter visitor contact : ");
        if(x != null)
        {
            //fetch rating by viscon and docid
            // this.setState({

            //     rateopen: false,
            //     visfetch: true,
            //     visfound: false,
            //     viscon: x,
            //     visname: "Peggy", // if visfound false, visname will stay empty
            //     visrate: "5"
            // });


            this.fetchVisRate(x);
        }
    }

    fetchVisRate(x)
    {

        var that = this;
        var actionStr = baseLink + "rating/" + this.state.docid + "/" + x;
        fetch(actionStr,{

            method: "GET",

        }).then(function(response){

            return response.text();

        }).then(function(val){

            var jsonObj = JSON.parse(val);

            console.log("vis rate fetched");
            console.log(jsonObj);

            if(jsonObj.length == 0)
            {
                //vis not found to insert
                that.setState({

                    rateopen: false,
                    visfetch: true,
                    visfound: false,
                    viscon: x

                });

            }
            else
            {
                //vis found, so update
                that.setState({

                    rateopen: false,
                    visfetch: true,
                    visfound: true,
                    viscon: jsonObj[0]['viscon'],
                    visname: jsonObj[0]['visname'], // if visfound false, visname will stay empty
                    visrate: jsonObj[0]['visrate']
                });


            }

        }); 

    }

    visRateSelectChange(e)
    {
        var x = e.target.value;
        if(this.state.prevvisrate == "" && this.state.visfound == true)
        {
            this.setState({

                prevvisrate: this.state.visrate

            });
        }

        this.setState({

            visrate: x

        });
    }

    modifyVisrate(status)
    {

        var str = "POST";
        if(status == "update")
        {
            str = "PUT";
        }

        var rateObj = {"docid":parseInt(this.state.docid),"viscon":this.state.viscon,"visname":this.state.visname,"visrate":parseInt(this.state.visrate)};
        rateObj = JSON.stringify(rateObj);
        var actionStr = baseLink + "rating/" + rateObj;
        fetch(actionStr,{

            method: str,

        }).then(function(response){

            return response.text();

        }).then(function(val){

            var jsonObj = JSON.parse(val);
            if(jsonObj == "yes")
            {
               if(status == "update")
               {
                window.alert("successfully updated");
               }
               else
               {
                  window.alert("successfully inserted");
               }
            }
            else
            {
               window.alert("rate modification failed");
            }

        });

    }

    rateSubmit()
    {

        if(this.state.visname == "" || this.state.visname == null)
        {
            window.alert("can't leave name empty");
            return;
        }

        var x;
        var rc;
        if(this.state.visfound)
        {
            x = parseFloat(this.state.rate)*parseInt(this.state.ratecount) - parseInt(this.state.prevvisrate) + parseInt(this.state.visrate);
            x = x/parseFloat(this.state.ratecount);
            rc = parseInt(this.state.ratecount);
            //update by docid viscon visrate
            this.modifyVisrate("update");
        }
        else
        {
            x = parseFloat(this.state.rate)*parseInt(this.state.ratecount) + parseInt(this.state.visrate);
            x = x/(parseFloat(this.state.ratecount) + 1);
            rc = parseInt(this.state.ratecount) + 1;
            //insert docid viscon visname visrate
            this.modifyVisrate("insert");
        }
        console.log("rate : " + x + " and rate-count : " + rc);
        x = parseInt(x*100)/100.0;
        
       console.log("rate submit is clicked");
       this.setState({

        rate: x,
        ratecount: rc,
        rateopen: true,
        visfetch: false,
        visfound: false,
        viscon: "",
        visname: "", // if visfound false, visname will stay empty
        visrate: "3", //this is standard visrate option, nothing to be confused about
        prevvisrate: ""

       });
    }

    rateCancel()
    {
        this.setState({

            rateopen: true,
            visfetch: false,
            visfound: false,
            viscon: "",
            visname: "", // if visfound false, visname will stay empty
            visrate: "3",
            prevvisrate: ""
        });

    }

    render()
    {
        console.log("render is called");
        return (

            <div id = 'rateContainer'>
            {
               this.state.rateopen?
               
                  this.state.rate != -1?
                  <>
                  <div id = 'docRate'>{this.state.rate}/5</div>
                  <hr/>
                  <span id = 'rateCount'>rated by {this.state.ratecount}</span>
                  <button id = 'rateBtn' onClick={()=>this.openRateBlock()}>Rate</button>
                  </>
                  :
                  null 
               
               :
               
                  this.state.visfetch?
                  <>
                  <div id = 'rateViscon'>{this.state.viscon}</div>

                  {
                    this.state.visfound?
                    <div id = 'rateVisname'>{this.state.visname}</div>  
                    :
                    <input type = "text" id = 'rateVisnameText' value = {this.state.visname} onChange={(e)=>this.setState({visname: e.target.value})} placeholder = "Enter Name"></input>
                  
                  }
                  <br/>
                  <select id = 'visRateSelect' value = {this.state.visrate} onChange={(e)=>this.visRateSelectChange(e)}>
                  <option value = "1">Very Bad</option>
                  <option value = "2">Bad</option>
                  <option value = "3">Moderate</option>
                  <option value = "4">Good</option>
                  <option value = "5">Very Good</option>
                  </select>
                  <hr/>
                  <button id = 'rateSubmitBtn' onClick = {()=>this.rateSubmit()}>Submit</button>
                  <button id = 'rateCancelBtn' onClick = {()=>this.rateCancel()}>Cancel</button>
                  </>
                  :
                  null
                
            }
            </div>
        );

    }

}