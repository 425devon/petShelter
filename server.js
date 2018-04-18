const express = require('express');
const app = express();
const bp = require('body-parser');
const path = require('path');
app.use(bp.json());
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/beltdb');
app.use(express.static(__dirname + '/public/dist'));

let PetSchema = mongoose.Schema({
    name: { type: String, minlength: [3, "Pets name must be atleast 3 characters long"]},
    type: { type: String, minlength: [3, "Pets Type must be specified and atleast 3 characters long"]},
    desc: { type: String, minlength: [3, "pets description must be atleast 3 characters long"]},
    skills: [String],
    likes: {type: Number, default: 0}
})
mongoose.model('Pet', PetSchema);
let Pet = mongoose.model('Pet');

app.get('/pets', function (req, res){
    console.log("server get route hit")
    Pet.find({}, function (err, pets) {
        if (err) {
            console.log("there was an error");
            res.json({
                message: "error",
                error: err
            });
        } else {
            res.json({
                message: "Success",
                data: pets
            });
        }
    })
})

app.post("/pets", function (req, res) {
    console.log("server save route hit")
    // if(Pet.find({name: req.body.name}) !== null){
    //     res.json({
    //         message: "error",
    //         error: "Pets name is already taken"
    //     })
    // }else{
        var newpet = new Pet({
            name: req.body.name,
            type: req.body.type,
            desc: req.body.desc,
            skills: req.body.skills,
            likes: req.body.likes
        });
        newpet.save(function (err, newpet) {
            if (err) {
                console.log("error saving new pet");
                res.json({
                    message: "error",
                    error: err
                })
            } else {
                console.log("success!");
                res.json({
                    message: "Successfully saved pet",
                    data: newpet
                });
            }
        })
    //}
})

app.get("/pets/:id", function (req, res) {
    Pet.find({
        _id: req.params.id
    }, function (err, pet) {
        if (err) {
            console.log("there was an error");
            res.json({
                message: "Error",
                error: err
            });
        } else {
            console.log("success!");
            res.json({
                message: "Success",
                data: pet
            });
        }
    })
})

app.put("/pets/:id", function (req, res) {
    Pet.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}, (err, pet)=> {
        if (err) {
            console.log("error updating!");
            res.json({
                message: "error",
                error: err
            });
        } else {
            console.log("success!");
            res.json({
                message: "Success",
                data: pet
            });
        }
    })
})

app.delete("/pets/:id", function (req, res) {
    Pet.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log("error removing!");
            res.json({
                message: "error",
                error: err
            });
        } else {
            console.log("success!");
            res.json({
                message: "Success"
            });
        }
    })
})




app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/index.html"))
});

app.listen(8000, ()=>{
    console.log("listening on port 8000");
})