const schema = require("../validationYup");
const article = require('../models/articles');
const author = require("../models/author");
const authorController = require("./authorController");
const { ObjectID } = require("bson");
//POST
exports.newArticle = (req, res, next) => {
    schema.isValid(req.body)
        .then(async () => {
            const articulo = new article(req.body);
            try {
                articulo.save();
                let foundAuthor = await author.findById({ _id: articulo.author })
                foundAuthor.articles.push(articulo)
                foundAuthor.save();
                res.json({
                    mensaje: "the article was succesfully saved"
                })
            } catch (error) {
                console.log("el error en el post es: ", error.message)
                res.json({
                    mensaje: "the article was not saved"
                })
                next();
            }
        })
        .catch(err => {
            console.error(`Error validating: ${err.message}`);
            res.json({
                mensaje: "the request did not meet the requirements"
            })
        });
}
//---------------------------------------------------------------------------------------------------------------------------------------------------

//GET ALL
exports.getAll = async (req, res, next) => {
    try {
        const articles = await article.find({})
        res.json({
            data: articles,
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            message: "could not get articles",
        })
        next();
    }
}
//-----------------------------------------------------------------------------------------------------------------------------------------

//GET BY ID
exports.getById = async (req, res, next) => {
    try {
        const articleById = await article.findById(req.params.id)
        res.json({
            data: articleById,
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            message: "could not get the requested article",
        })
        next();
    }
}

//---------------------------------------------------------------------------------------------------------------------

// PUT
exports.updatePut = (req, res, next) => {
    schema.isValid(req.body)
        .then(async () => {
            try {
                const updateArticle = await article.findOneAndUpdate({ _id: req.params.id }, req.body, {
                    new: true
                })
                res.json({
                    data: updateArticle,
                })
            } catch (error) {
                console.log(error.message);
                res.json({
                    message: "could not update the article",
                })
                next();
            }
        })
        .catch(err => {
            console.error(`Error validating: ${err.message}`);
            res.json({
                mensaje: "the request did not meet the requirements"
            })
        });
}

//-------------------------------------------------------------------------------------------------------------------

// PATCH
exports.updatePatch = async (req, res, next) => {

    try {
        const updatedArticle = await article.findByIdAndUpdate({ _id: req.params.id }, req.body, {
            new: true
        })
        res.json({
            message: "succesfully updated",
            data: updatedArticle,
        })
    } catch (error) {
        console.error(error.message);
        res.json(401, {
            message: "could not update the article",
        })
        next();
    }
}
//--------------------------------------------------------------------

//DELETE
exports.deleteArticle = async (req, res, next) => {
    console.log(req.params.id);
    try {

        let foundArticle = article.findById({ _id: req.params.id })
       let authorId = foundArticle.author;
        
        await article.deleteOne({ _id: req.params.id }, { new: true })
        
        let foundAuthor = await author.findById({ _id: authorId })
        //foundAuthor.update({ $pull: { articles: req.params.id } })
        //foundAuthor.save();
        res.json({
            message: "The article was successfully deleted",
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            message: "could not delete the article",
        })
        next();
    }
}