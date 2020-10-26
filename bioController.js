const Bio= require('./biomodel');
let dataSet =[];
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
        dataSet.push(bio);
    });
};


// Creating new BIo
exports.add = (req, res) => {
    var bio = new Bio();
    bio.bio_id = dataSet.length + 1;
    bio.name = req.body.name? req.body.name : bio.name;
    bio.email = req.body.email;
    bio.phone = req.body.phone;
    bio.address = req.body.address;

    dataSet.push(bio);
    console.log(dataSet);
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
    bio.findById(req.params.bio_id, (err, bio) =>{
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
}