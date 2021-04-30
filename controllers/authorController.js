const schema = require('../validateAuthor');
const author = require('../models/author');

//POST AUTHOR
exports.newAuthor = async (req, res, next) => {

    if (schema.validate(req.body)) {
        // create new article
        const autor = new author(req.body);
        try {
            await autor.save();
            res.json({
                mensaje: "the author was succesfully saved"
            })
        } catch (error) {
            console.error(error)
            res.json({
                mensaje: "the author was not saved"
            })
            next();
        }
    }
    else {
        res.json({
            mensaje: "the request did not meet the requirements"
        })
    }
}

// GET ALL
exports.getAll = async (req, res, next) => {
    try {
        const authors = await author.find({})
        res.json({
            data: authors,
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            message: "could not get the author",
        })
        next();
    }
}

// GET BY ID
exports.getById = async (req, res, next) => {
    try {
        const authorById =  await author.findById(req.params.id).populate({path: 'articles', select: 'title'})
          res.json({
            data: authorById,
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            message: "could not get the requested article",
        })
        next();
    }
}

// PUT
exports.updatePut = async (req, res, next) => {
    try {
        const validate = await schema.validate(req.body, { abortEarly: false })
        console.log(validate);
        if (validate) {
            const authorUpdate = await author.findByIdAndUpdate({ _id: req.params.id }, req.body, {
                new: true
            })
            res.json({
                data: authorUpdate,
            })
        }
    } catch (error) {
        res.status(404);
        res.json({ mensaje: 'El cambio no es valido' });
        next();
    }
};

// DELETE

exports.deleteAuthor = async (req, res, next) => {
    try {
        await author.remove({ _id: req.params.id }, { new: true })
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