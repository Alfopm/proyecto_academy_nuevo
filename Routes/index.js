const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController')
const authorController = require('../controllers/authorController')


module.exports = function () {
    //HOME
    router.get('/', (req, res) => {
        res.send("En home")
    })
    //----------------------------------------------------------------------
    
    //ARTICLES
    
    //POST
    router.post('/articles', articleController.createArticle)
    //----------------------------------------------------------------------
    // GET ALL
    router.get('/articles', articleController.getAll)
    //----------------------------------------------------------------------
    //GET BY ID
    router.get('/articles/:id', articleController.getById)
    //----------------------------------------------------------------------
    // PUT
    router.put('/articles/:id', articleController.updatePut)
    //----------------------------------------------------------------------
    // DELETE
    router.delete('/articles/:id', articleController.deleteArticle)
    //----------------------------------------------------------------------
    //PATCH
    router.patch('/articles/:id', articleController.updatePatch)
    //----------------------------------------------------------------------


    //AUTHORS

    //POST
    router.post('/authors', authorController.createAuthor)
    //----------------------------------------------------------------------
    // GET ALL
    router.get('/authors', authorController.getAll)
    //----------------------------------------------------------------------
    // //GET BY ID
    router.get('/authors/:id', authorController.getById)
    //----------------------------------------------------------------------
    // // PUT
    router.put('/authors/:id', authorController.updatePut)
    //----------------------------------------------------------------------
    // // DELETE
    router.delete('/authors/:id', authorController.deleteAuthor)
    //----------------------------------------------------------------------
    


    return router
}