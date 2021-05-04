const schema = require('../validateAuthor');
const author = require('../models/author');
const article = require('../models/articles');
//POST AUTHOR
exports.createAuthor = async (req, res, next) => {
    if (validTokenPost) {
        schema.isValid(req.body)
            .then(async () => {
                try {
                    const autor = new author(req.body);
                    await autor.save();
                    res.json({
                        mensaje: "the author was succesfully saved"
                    })
                } catch (error) {
                    
                    res.json({
                        mensaje: "the author was not saved"
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
    } else {
        res.status(401).send("You do not have access");
        next();
    }

}

// GET ALL
exports.getAll = async (req, res, next) => {
    try {
        const authors = await author.find({}).populate({ path: 'articles', select: 'title' })
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
        const authorById = await author.findById(req.params.id).populate({ path: 'articles', select: 'title' })
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
    if (validToken) {
        const validate = await schema.isValid(req.body, { abortEarly: false })
            .then(async () => {
                try {
                    const authorUpdate = await author.findByIdAndUpdate({ _id: req.params.id }, req.body, {
                        new: true
                    })
                    res.json({
                        data: authorUpdate,

                    })
                }
                catch (error) {
                    res.status(404);
                    res.json({ mensaje: 'El cambio no es valido' });
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

}

// DELETE

//Al eliminar un autor, elimine todos los artículos publicados por el autor.
exports.deleteAuthor = async (req, res, next) => {
    if (validToken) {
        try {
            await author.deleteOne({ _id: req.params.id }, { new: true })
            await article.deleteMany({ author: req.params.id })
            res.json({
                message: "The author was successfully deleted",
            })
        } catch (error) {
            console.log(error.message);
            res.json({
                message: "could not delete the article",
            })
            next();
        }
    }
    else {
        res.status(401).send("You do not have access");
        next();
    }
}

let validToken = (inputHeader, id) => {
    if (inputHeader === Buffer.from(id).toString('base64')) {
        return true;
    } else {
        return false;
    }
}
let validTokenPost = (inputHeader) => {
    if (inputHeader > 0 && inputHeader <= 10) {
        return true;
    } else {
        return false;
    }
}