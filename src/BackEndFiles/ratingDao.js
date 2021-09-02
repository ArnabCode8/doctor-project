const mysql = require("mysql");

const pool = mysql.createPool({

    connectionLimit : 10,
    host : "localhost",
    user : "root",
    database : "doctordb",
});

// docid viscon visname visrate
function addRating(rate)
{
    return new Promise(function(resolve,reject){

        pool.getConnection(function(err,con){

            if(err)throw err;
            con.query("INSERT INTO rating SET ?",rate,function(err,rows){

                con.release();
                str = "yes";
                if(err)
                {
                    str = "no";
                }

                resolve(str);

            });

        });

    });
}

function ratingsByDocIdViscon(docid,viscon)
{
    return new Promise(function(resolve,reject){

        pool.getConnection(function(err,con){

            if(err)throw err;

            con.query("SELECT * FROM rating WHERE docid = ? AND viscon = ?",[docid,viscon],function(err,rows){

                con.release();

                var jsonStr = JSON.stringify(rows);
                var resOut = JSON.parse(jsonStr);

                resolve(resOut);

            });

        });

    });
}

function ratingByDocId(docid)
{
    return new Promise(function(resolve,reject){

        pool.getConnection(function(err,con){

            if(err)throw err;
            
            var did = parseInt(docid);
            con.query("SELECT COUNT(visrate) AS count,IFNULL(AVG(visrate),0) AS rate FROM rating WHERE docid = ?",did,function(err,rows){

                con.release();

                var jsonStr = JSON.stringify(rows);
                var resOut = JSON.parse(jsonStr);
                resolve(resOut);

            });

        });

    });
}


function updateRatingByDocIdViscon(rating)
{
    return new Promise(function(resolve,reject){

        pool.getConnection(function(err,con){

            if(err)throw err;

            con.query("UPDATE rating SET visrate = ? WHERE docid = ? AND viscon = ?",[rating['visrate'],rating['docid'],rating['viscon']],function(err,rows){

                con.release();
                var str = "yes";
                if(err)
                {
                    str = "no";
                }

                resolve(str);

            });

        });

    });
}

module.exports.addRating = addRating;
module.exports.ratingsByDocIdViscon = ratingsByDocIdViscon;
module.exports.ratingByDocId = ratingByDocId;
module.exports.updateRatingByDocIdViscon = updateRatingByDocIdViscon;