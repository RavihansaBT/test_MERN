const Bio = require('./biomodel');
const { v4: uuidv4 } = require('uuid');

let b_id = "";
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

    b_id =bio.bio_id;
// Save and check error
    bio.save((err) =>{
        if(err){
            res.json(err);
        }

        res.json({
            message : "New bio added",
            data : bio
        });
    });
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