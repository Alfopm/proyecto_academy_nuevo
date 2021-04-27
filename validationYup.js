const yup = require("yup");

let hoy = new Date();
let https = /https:\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
let src = /(ARTICLE | BLOG | TWEET | NEWSPAPER)/;


const schema = yup.object().shape({
        id: yup
          .string("Must be a string")
          .length(36, "Maximum 36 characters")
          .required("id is required"),
        title: yup
          .string("Must be a string")
          .max(255, "Maximum 255 characters")
          .required("title is required"),
        author: yup
          .string("Must be a string")
          .max(100, "Maximum 100 characters")
          .required("author is required"),
        modifiedAt: yup
          .date("Must be a date")
          .max(hoy, "Date cant be later than today")
          .required("modifiedAt is required"),
        publishedAt: yup
          .date("Must be a date")
          .max(hoy, "Date cant be later than today")
          .nullable(true),
        url: yup
          .string("Must be a string")
          .matches(https, "Must be https protocol")
          .when("publishedAt", {
            is: null || "",
            then: yup.string("Must be a string").nullable(true),
          }),
        keywords: yup.array(yup.string("Must be a string")).min(1).max(3),
        readMins: yup
          .number("Must be a number")
          .positive("Must be positive number")
          .min(1, "Minimum 1 character")
          .max(20, "Maximum 20 characters")
          .required("readMins is required"),
        source: yup
          .string("must be a string")
          .required("source is required")
          .matches(/(ARTICLE|BLOG|TWEET|NEWSPAPER)/),
          //.oneOf(['ARTICLE', 'BLOG', 'TWEET', 'NEWSPAPER'])
      });



module.exports = schema;