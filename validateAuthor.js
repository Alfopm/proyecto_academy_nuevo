const yup = require("yup");

// Apéndice B: Colección authors
//     id: String que identifica el autor.
//     ID único entre todos los registros. 
//     Generado internamente.
//     name: Nombre del autor
//     Requerido.
//     articles: Listado de artículos publicados por el autor.
//     Es una lista de Ids.
//     La lista puede estar vacía.

const schema = yup.object().shape({
    name:yup.string().required(),
    articles: yup.array().of(yup.string()).nullable()
})


module.exports = schema;