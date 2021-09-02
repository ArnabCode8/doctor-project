
//cmtid docid viscon visname date cmt
const mysql = require("mysql");

const pool = mysql.createPool({

    connectionLimit : 10,
    host : "localhost",
    user : "root",
    database : "doctordb",
});

function addComment(comment)
{
    return new Promise(function(resolve,reject){

        pool.getConnection(function(err,con){

            if(err)throw err;

            con.query("INSERT INTO comment SET ?",comment,function(err,res){

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

function allCommentsByDocId(docid)
{
    return new Promise(function(resolve,reject){

        pool.getConnection(function(err,con){

            if(err)throw err;

            con.query("SELECT * FROM comment WHERE docid = ?",docid,function(err,rows){
                
                con.release();
                var jsonStr = JSON.stringify(rows);
                var resOut = JSON.parse(jsonStr);
                resolve(resOut);

            });

        });

    });

}

function updateCommentAndDateByVisconAndDocId(comment)
{
    return new Promise(function(resolve,reject){

        pool.getConnection(function(err,con){

            if(err)throw err;

            con.query("UPDATE comment SET date = ?, cmt = ? WHERE docid = ? AND viscon = ?",[comment['date'],comment['cmt'],comment['docid'],comment['viscon']],function(err,rows){

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


module.exports.addComment = addComment;
module.exports.allCommentsByDocId = allCommentsByDocId;
module.exports.updateCommentAndDateByVisconAndDocId = updateCommentAndDateByVisconAndDocId;