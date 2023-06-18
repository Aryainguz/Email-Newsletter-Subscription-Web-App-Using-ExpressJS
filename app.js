const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { request } = require("http");

const app = express();

app.use(express.static("public"));  //use this to use css files insie templates 
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res){

    const key = "452e8d7e850745def07a9aa3828a78ac-us21"
    const list_id = "3032762d40"

    const email = req.body.email
    const fname = req.body.fname 
    const lname = req.body.lname
    
    const data = {
        members:[{

        email_address:email,
        status:"subscribed",
        merge_fields:{
            FNAME: fname,
            LNAME: lname
        }
        }
        ]
    }

    const json = JSON.stringify(data)

    const options={
        method:"POST",
        auth:"aryainguz:452e8d7e850745def07a9aa3828a78ac-us21"
    }


    const url  = "https://us21.api.mailchimp.com/3.0/lists/3032762d40/"

    const request = https.request(url,options,function(response){
        if(response.statusCode==200){
                res.sendFile(__dirname+"/success.html")
        }
        else{
                res.sendFile(__dirname+"/failure.html")
            
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(json);
    request.end()

})

app.listen("3000",function(){
    console.log("Server Started Sucessfully")
})