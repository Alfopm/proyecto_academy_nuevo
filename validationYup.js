const yup = require("yup");

let today = new Date();

const schema = yup.object().shape({
  id: yup
    .string("Must be a string")
    .length(36, "Must be 36 characters")
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
    .max(today, "Date cant be later than today")
    .required("modifiedAt is required"),
  publishedAt: yup
    .date("Must be a date")
    .max(today, "Date cant be later than today")
    .nullable(true),
  url: yup
    .string("Must be a string")
    .when('publishedAt', (publishedAt, schema) => {
      return publishedAt ? schema.required().matches(/^https:\/\/*/) : schema;
    }),
  keywords: yup
    .array()
    .of(yup.string().ensure().required())
    .min(1)
    .max(3),
  readMins: yup
    .number("Must be a number")
    .min(1, "Minimum 1 character")
    .max(20, "Maximum 20 characters")
  .required("readMins is required"),
  source: yup
    .string("must be a string")
    .required("source is required")
   // .matches(/(ARTICLE|BLOG|TWEET|NEWSPAPER)/),
  .oneOf(['ARTICLE', 'BLOG', 'TWEET', 'NEWSPAPER'])
});

module.exports = schema;
