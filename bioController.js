const Bio = require('./biomodel');
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const path = require('path');
const _ = require('lodash');

let b_id ;
let uploadFolder = "./uploads/";
let fileName = [];

//for index
exports.index = (req, res) => {
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
    });
};


// Creating new BIo
exports.add = (req, res) => {
    var bio = new Bio();
    bio.bio_id = uuidv4();
    bio.name = req.body.name ? req.body.name : bio.name;
    bio.email = req.body.email;
    bio.phone = req.body.phone;
    bio.address = req.body.address;

    try {
        if (!req.files) {
            res.send({
                status: false,
                message: "No files upload"
            });
        }
        else {
            let datalist = [];
            let upload_files;

            if (req.files.upload_files.length > 1) {
                fileName = [];
                _.forEach(_.keysIn(req.files.upload_files), (key) => {
                    upload_files = req.files.upload_files[key];

                    // check file availability
                    if (fs.existsSync(uploadFolder + upload_files.name)) {
                        datalist.push(upload_files.name + " already exists");
                    } else {
                        //move photo to uploads directory
                        upload_files.mv(uploadFolder + upload_files.name);
                        //push file details
                        datalist.push({
                            name: upload_files.name,
                            mimetype: upload_files.mimetype,
                            size: upload_files.size
                        });

                        fileName.push(upload_files.name);
                    }
                });
            } else {
                upload_files = req.files.upload_files;

                if (fs.existsSync(uploadFolder + upload_files.name)) {
                    datalist.push(upload_files.name + " already exists");
                } else {
                    upload_files.mv(uploadFolder + upload_files.name);
                    datalist.push({
                        name: upload_files.name,
                        mimetype: upload_files.mimetype,
                        size: upload_files.size
                    });
                    fileName = [];
                    fileName.push(upload_files.name);
                }
               
            }

            bio.upload_files = fileName;

            bio.save((err) => {
                if (err) {
                    res.json(err);
                }

                res.send({
                    status: true,
                    message: "File uploaded",
                    data: {
                        message: "New bio added",
                        data: bio,
                        upload_files_details: datalist
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
    Bio.find({bio_id : req.params.bio_id}, (err, bio) => {
        if (err) {
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
    Bio.findOne({bio_id : req.params.bio_id}, (err, bio) => {
        if (err) {
            res.send(err);
        }
        
        bio.name = req.body.name ? req.body.name : bio.name;
        bio.email = req.body.email;
        bio.phone = req.body.phone;
        bio.address = req.body.address;
        
        try {
            if (!req.files) {
                res.send({
                    status: false,
                    message: "No files upload"
                });
            }
            else {
                let datalist = [];
                let upload_files;
    
                if (req.files.upload_files.length > 1) {
                    fileName = [];
                    _.forEach(_.keysIn(req.files.upload_files), (key) => {
                        upload_files = req.files.upload_files[key];
    
                        // check file availability
                        if (fs.existsSync(uploadFolder + upload_files.name)) {
                            datalist.push(upload_files.name + " already exists");
                        } else {
                            //move photo to uploads directory
                            upload_files.mv(uploadFolder + upload_files.name);
                            //push file details
                            datalist.push({
                                name: upload_files.name,
                                mimetype: upload_files.mimetype,
                                size: upload_files.size
                            });
    
                            fileName.push(upload_files.name);
                        }
                    });
                } else {
                    upload_files = req.files.upload_files;
    
                    if (fs.existsSync(uploadFolder + upload_files.name)) {
                        datalist.push(upload_files.name + " already exists");
                    } else {
                        upload_files.mv(uploadFolder + upload_files.name);
                        datalist.push({
                            name: upload_files.name,
                            mimetype: upload_files.mimetype,
                            size: upload_files.size
                        });
                        fileName = [];
                        fileName.push(upload_files.name);
                    }
                   
                }
    
                bio.upload_files = fileName;
    
                bio.save((err) => {
                    if (err) {
                        res.json(err);
                    }
    
                    res.send({
                        status: true,
                        message: "File uploaded",
                        data: {
                            message: "bio Updated",
                            data: bio,
                            upload_files_details: datalist
                        }
                    });
    
                });
            }
    
        } catch (error) {
            res.status(500).send(err);
        }
    });
};

// Delete Bio
exports.delete = (req, res) => {
    Bio.deleteOne({
        bio_id : req.params.bio_id
    }, (err, contact) => {
        if (err)
            res.send(err)
        res.json({
            status: "success",
            message: 'Bio Deleted'
        })
    })
};



let scanFolder = () => {
    const directoryPath = path.join(__dirname, 'uploads');
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            console.log(file); 
        });
    });
}