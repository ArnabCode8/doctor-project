const express = require("express");
const path = require('path');
var cors = require('cors');

const commentDao = require("./commentDao.js");
const ratingDao = require("./ratingDao.js");
const docDao = require("./docDao.js");
const cityDao = require("./cityDao.js");
const expDao = require("./expDao.js");

const app = express(); //class instantanised to call get post etc
const port = process.env.PORT || 9890;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.get("/test/:id",function(req,res){

    const id = req.params['id'];
    console.log("received id : " + id);
    res.send("My name is Arnab Das");
});

//COMMENT MODULE

app.post("/comment/:comment",function(req,res){

    const comment = JSON.parse(req.params['comment']);
    console.log("received in control");
    console.log(comment);

    var pro = commentDao.addComment(comment);

    pro.then(function(val){

        console.log("comment insertion status : " + val);
        res.json(val);
    });

});

app.get("/comment/:docid",function(req,res){

    const docid = JSON.parse(req.params['docid']);
    console.log("Docid received in control : " + docid);

    var pro = commentDao.allCommentsByDocId(docid);
    pro.then(function(val){

        console.log("all comments in control");
        console.log(val);
        res.json(val);

    });

});

app.put("/comment/:comment",function(req,res){

    const comment = JSON.parse(req.params['comment']);
    console.log("received in control");
    console.log(comment);

    var pro = commentDao.updateCommentAndDateByVisconAndDocId(comment);
    pro.then(function(val){

        console.log("comment updation status : " + val);
        res.json(val);

    });

});

//RATING MODULE

app.post("/rating/:rating",function(req,res){

    const rating = JSON.parse(req.params['rating']);
    console.log("rating received in control : ");
    console.log(rating);
    
    var pro = ratingDao.addRating(rating);
    pro.then(function(val){

        console.log("rating insertion status : " + val);
        res.json(val);

    });

});

app.get("/rating/:docid/:viscon",function(req,res){

    const docid = JSON.parse(req.params['docid']);
    const viscon = JSON.parse(req.params['viscon']);
    console.log("received docid in control : " + docid + " and viscon : " + viscon);

    var pro = ratingDao.ratingsByDocIdViscon(docid,viscon);
    pro.then(function(val){

        console.log("ratings by docid : " + docid + " and viscon: " + viscon);
        console.log(val);
        res.json(val);

    });

});

app.get("/docrating/:docid",function(req,res){

    const docid = JSON.parse(req.params['docid']);
    console.log("docid received in doc-rating control : " + docid);
    var pro = ratingDao.ratingByDocId(docid);
    pro.then(function(val){

        console.log("doc-rating in control : ");
        console.log(val);
        res.json(val);

    });

});

app.put("/rating/:rating",function(req,res){

    const rating = JSON.parse(req.params['rating']);
    console.log("rating received in control");
    console.log(rating);

    var pro = ratingDao.updateRatingByDocIdViscon(rating);
    pro.then(function(val){

        console.log("rating updation status : " + val);
        res.json(val);

    });

});

//DOCTOR MODULE

app.post("/doctor/:doctor",function(req,res){

    const doctor = JSON.parse(req.params['doctor']);
    console.log("received doctor in control");
    console.log(doctor);

    var pro = docDao.addDoctor(doctor);
    pro.then(function(val){

        console.log("doctor insertion status : " + val);
        res.json(val);

    });

});

app.get("/doctor/:doccity/:docexp",function(req,res){

    const doccity = JSON.parse(req.params['doccity']);
    const docexp = JSON.parse(req.params['docexp']);
    //always search by single exp, query is formed as such 
    console.log("received city and doc-exp in control : " + doccity + " and " + docexp);
    var pro = docDao.doctorsByCityAndExps(doccity,docexp);
    pro.then(function(val){

        console.log("docs output in control");
        console.log(val);
        res.json(val);
    });

});

app.get("/singledoc/:docid",function(req,res){

    const docid = parseInt(JSON.parse(req.params['docid']));
    console.log("docid received in control : " + docid);
    console.log("got hit from react page now");
    var pro = docDao.docById(docid);
    pro.then(function(val){

        console.log("doctor by id : " + docid);
        var doc = val[0];
        console.log("doc in outer");
        console.log(doc);
        var pro1 = cityDao.cityNameById(doc.doccity);
        pro1.then(function(val1){

            var cityname = val1[0].cityname;

            var pro2 = expDao.expsByIdStr(doc.docexps);
            pro2.then(function(val2){

                var expStr = val2;

                var resOut = [];
                resOut.push(doc);
                resOut.push(cityname);
                resOut.push(expStr);
                console.log(resOut);
                res.json(resOut);
            });

        });

    });

});

app.get("/docconpass",function(req,res){

    var pro = docDao.allConPass();
    pro.then(function(val){

        console.log("all con pass in control : ");
        console.log(val);
        res.json(val);

    });

});

app.get("/docpassid",function(req,res){

    var pro = docDao.allPassDoc();
    pro.then(function(val){

        console.log("all con pass in control : ");
        console.log(val);
        res.json(val);

    });

});

app.put("/doctor/:doctor",function(req,res){

    const doctor = JSON.parse(req.params['doctor']);
    console.log("doctor received in control");
    console.log(doctor);

    var pro = docDao.updateDoc(doctor);
    pro.then(function(val){

        console.log("doctor updation status : " + val);
        res.json(val);

    });

});

//CITY MODULE


app.post("/city/:city",function(req,res){

    const city = JSON.parse(req.params['city']);
    console.log("received city in control");
    
    var pro = cityDao.addCity(city);
    pro.then(function(val){

        console.log("city insertion status : " + val);
        res.json(val);

    });

});

app.get("/city",function(req,res){

    var pro = cityDao.allCities();
    pro.then(function(val){

       console.log("all cities in control : ");
       console.log(val);

       res.json(val);

    });

});

//EXP MODULE

app.post("/exp/:exp",function(req,res){

    const exp = JSON.parse(req.params['exp']);
    console.log("expertise received in control : ");
    console.log(exp);

    var pro = expDao.addExp(exp);
    pro.then(function(val){

        console.log("expertise insertion status : " + val);
        res.json(val);

    });

});

app.get("/exp",function(req,res){

    var pro = expDao.allExps();
    pro.then(function(val){

        console.log("all expertises in control");
        console.log(val);
        res.json(val);
    });

});

app.get("/expid/:idstr",function(req,res){

    const idStr = JSON.parse(req.params['idstr']);
    console.log("idstr received in control : " + idStr);

    var pro = expDao.expsByIdStr(idStr);
    pro.then(function(val){

        console.log("Exp names in control");
        console.log(val);
        res.json(val);

    });

});

app.listen(port,function(){

    console.log(`listening to the port : ${port}`);

});