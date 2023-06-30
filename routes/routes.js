const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const multer = require('multer');

//upload image
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename:function(req, file, cb){
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({
    storage:storage,
}).single("Image");

//add product
router.post('/add', upload, (req, res) => {
    const product = new Product({
        Product_Name: req.body.Product_Name,
        Price: req.body.Price,
        Description: req.body.Description,
        Image: req.file.filename,
    });
    product.save()
    .then((result) => {
        res.redirect('/add');
    })
    .catch((err) => {
        console.log(err);
    });
        
});

//get all products
router.get('/', (req, res) => {
    Product.find()
    .then((result) => {
        res.render('index', {title: "Home", products: result});
    })
    .catch((err) => {
        console.log(err);
    });
});

//Delete product
router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    Product.findByIdAndDelete(id)
        .then((result) => {
            if (result.Image !== '') {
                try {
                    fs.unlinkSync('./uploads/' + result.Image);
                } catch (err) {
                    console.log(err);
                }
            }
            req.session.message = {
                type: 'success',
                message: 'Product deleted successfully',
            };
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
            res.json({ message: err.message });
        });
});


router.get("/add", (req,res) =>{
    res.render("add_products", {title: "Add Products"});
});

module.exports = router;
