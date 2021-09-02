import React from 'react';
import './commentList.css';
import UnitCmt from './UnitCmt';
import baseLink from '../NesInfo';

//doctors id is only props of components
export default class CommentList extends React.Component
{
   constructor(props)
   {
       super(props);
       this.state = {

        viscon: "",
        visname: "",
        date: "",
        cmttext: "",
        index: -1,
        docid: this.props.docid,
        allcomts: "",
        listopen: true
       };
   }

   fetchComments()
   {
       var that = this;
       var actionStr = baseLink + "comment/" + JSON.stringify(parseInt(this.state.docid));
       fetch(actionStr,{

        method: "GET",

       }).then(function(response){

        return response.text();

       }).then(function(val){

        var jsonObj = JSON.parse(val);
        that.setState({

            allcomts: jsonObj,
            listopen: true

           });

       });

   }

   getCurrentDate()
   {
       var d = new Date();
       var str = d.toLocaleDateString();
       var arr = str.split("/");
       var str = parseInt(arr[1]) + "." + parseInt(arr[0]) + "." + parseInt(arr[2]);
       return str;
   }

   componentDidMount()
   {
       this.setState({

        date: this.getCurrentDate()

       });

       this.fetchComments();
   }

   
   addComment()
   {

     var x = prompt("Enter your contact number");
     if(x != null)
     {
         var tempIndex = this.state.allcomts.findIndex((item)=>item.viscon.trim() == x.trim());
         if(tempIndex > -1)
         {
             this.setState({

                viscon: this.state.allcomts[tempIndex].viscon,
                visname: this.state.allcomts[tempIndex].visname,
                cmttext: this.state.allcomts[tempIndex].cmt,
                index: tempIndex,
                listopen: false
             });
         }
         else
         {
            this.setState({

                listopen: false,
                viscon: x.trim()
             });
         }
     }
     
        
   }

   commentCancel()
   {
       this.setState({

        listopen: true,
        viscon: "",
        visname: "",
        cmttext: "",
        index: -1

       });
   }

   modifyComment()
   {
        var that = this; 
        var c = {
            "cmtid": "0",
            "docid": parseInt(this.state.docid), 
            "viscon": this.state.viscon,
            "visname": this.state.visname,
            "date": this.state.date,
            "cmt": this.state.cmttext 
        };

        console.log(c);

        var str = "POST";
        if(this.state.index > -1)
        {
           str = "PUT";
        }

        var actionStr = baseLink + "comment/" + JSON.stringify(c);
        fetch(actionStr,{

            method: str,

        }).then(function(response){

            return response.text();

        }).then(function(val){

            var jsonObj = JSON.parse(val);
            if(jsonObj == "yes")
            {
                window.alert("successfully modified");
            }
            else
            {
                window.alert("comment modification failed");
            }

            var arr = that.state.allcomts;
            if(that.state.index > -1)
            {
                arr.splice(that.state.index,1);
            }
            arr.push(c);       
            //update or insert by viscon in db, so cmtid is not important since injection will be by viscon
            that.setState({

                allcomts: arr,
                listopen: true,
                viscon: "",
                visname: "",
                cmttext: "",
                index: -1
            });

        });

   }

   commentSubmit()
   { 
      this.modifyComment();        
   }

   bindCmtText(e)
   {
       var x = e.target.value;
       this.setState({

        cmttext: x

       })
   }

   bindViscon(e)
   {
       var x = e.target.value;
       this.setState({

        viscon: x

       })
   }

   bindVisname(e)
   {
        var x = e.target.value;
        this.setState({

        visname: x

        })

   }

   render()
   {
       console.log("render is called"); 
       return (

        <div id = "commentContainer">

            {
                this.state.listopen?
                <>
                <div id = "commentList">
                {
                    this.state.allcomts != ""? 
                    this.state.allcomts.map(
                        (item)=> <UnitCmt comment = {item} />
                    )
                    :
                    <h2>No Comments</h2>
                }
                </div>
                <button id = 'addCmtBtn' onClick={()=>this.addComment()}>Add Comment</button>
                </>
                :
                <div id = "addCmtContainer">
                    <div id = "addCmtHead">Add Comment</div><hr/>
                    <div id = "visconIn">{this.state.viscon}</div>
                    {
                        this.state.index != -1?
                        <div id = 'visNameShow'>{this.state.visname}</div>
                        :
                        <input type = "text" id = "visnameIn" onChange={(e)=>this.bindVisname(e)} value = {this.state.visname} placeholder = "Enter Name"></input>    
                    }

                    <textarea id = 'addCmtText' rows="6" cols="55" onChange={(e)=>this.bindCmtText(e)} value = {this.state.cmttext}></textarea>
                    <hr/>
                    <button id = 'addCmtSubmit' onClick={()=>this.commentSubmit()}>Submit</button>
                    <button id = 'addCmtCancel' onClick={()=>this.commentCancel()}>Cancel</button>
                </div>     
            }
           
        </div>    

       );
   }

}