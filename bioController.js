const Bio = require('./biomodel');
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const _ = require('lodash');

let b_id = "";
let uploadFolder = "./uploads/";
let fileName = [];

//for index
exports.index = (req,res)=> {
    Bio.get((err, bio) => {
        if (err)
        res.json({
            status: "error",
            message: err
        });
        res.json({
            status: "success",
            message: "Got Bio Successfully!",
            data: bio       
        });
        // console.log(uuidv4();
    });
};


// Creating new BIo
exports.add = (req, res) => {
    var bio = new Bio();
    bio.bio_id = uuidv4();
    bio.name = req.body.name? req.body.name : bio.name;
    bio.email = req.body.email;
    bio.phone = req.body.phone;
    bio.address = req.body.address;
    

    try {
        if (!req.files) {
            res.send({
                status : false,
                message : "No files upload"
            });
        }
        else{
            let datalist = []; 

            

            // _.forEach(_.keysIn(req.files.photos), (key) => {
            //     let upload_files = req.files.upload_files[key];
                
            //     //move photo to uploads directory
            //     upload_files.mv(uploadFolder + upload_files.name);

            //     //push file details
            //     data.push({
            //         name: upload_files.name,
            //         mimetype: upload_files.mimetype,
            //         size: upload_files.size
            //     });
            //     fileName = upload_files[key].name;
            // });
            let upload_files;
                
            if(req.files.upload_files.length>1){
                fileName = [];
                _.forEach(_.keysIn(req.files.upload_files), (key) => {
                    upload_files = req.files.upload_files[key];
                    
                    //move photo to uploads directory
                    upload_files.mv(uploadFolder + upload_files.name);
    
                    //push file details
                    datalist.push({
                        name: upload_files.name,
                        mimetype: upload_files.mimetype,
                        size: upload_files.size
                    });
                    
                    fileName.push(upload_files.name); 
                    
            });
            } else {
                upload_files = req.files.upload_files;
                upload_files.mv(uploadFolder + upload_files.name);
                datalist.push({
                    name: upload_files.name,
                    mimetype: upload_files.mimetype,
                    size: upload_files.size
                });
                fileName = [];
                fileName.push(upload_files.name); 
            }

            bio.upload_files = fileName;
            
            bio.save((err) =>{
                if(err){
                    res.json(err);
                }
                
                
                
                res.send({
                    status : true,
                    message : "File uploaded",
                    data :{
                        message : "New bio added",
                        data : bio,
                        name : datalist
                    }
                });

            });
        }
        
    } catch (error) {
        res.status(500).send(err);
    }
};


//View Bio
exports.view = (req, res) => {
    Bio.findById(req.params.bio_id, (err, bio) =>{
        if(err){
            res.send(err);
        }
        res.json({
            message: 'Bio Details',
            data: bio
        });
    });
};

// Update Bio 
exports.update = (req, res) => {
    Bio.findById(req.params.bio_id, (err, bio) =>{
        if(err){
            res.send(err);
        }
        bio.name = req.body.name ? req.body.name : bio.name;
        bio.email = req.body.email;
        bio.phone = req.body.phone;
        bio.address = req.body.address;

//save and check errors
        bio.save( (err) => {
            if (err){
                res.json(err)
            }
            res.json({
                message: "Bio Updated Successfully",
                data: bio
            });
        });
    });
};

// Delete Bio
exports.delete =  (req, res) => {
    Bio.deleteOne({
        _id: req.params.bio_id
    }, (err, contact) => {
        if (err)
            res.send(err)
        res.json({
            status: "success",
            message: 'Bio Deleted'
        })
    })
};

// file upload
exports.uploadFile = async (req, res) => {
    try {
        if (!req.files) {
            console.log("test");
            res.send({
                status : false,
                message : "No files pload"
            });
        }
        else{
            let avatar = req.files.avatar;

            avatar.mv('./uploads/' + avatar.name);

            res.send({
                status : true,
                message : "File uploaded",
                data :{
                    name : avatar.name,
                    mimetype : avatar.mimetype,
                    size : avatar.size
                }
            });
        }
        
    } catch (error) {
        res.status(500).send(err);
    }
}