let validateId = (obj) => {
    if (obj.id !== "" && obj.id !== null && obj.id.length === 36) {
      return true;
    } else {
      return false;
    }
  };
  
  //----------------------------------------------------------------------------
  let validateTitle = (obj) => {
    let string = "string";
    if (
      typeof obj.title === "string" &&
      obj.title !== "" &&
      obj.title !== null &&
      obj.title.length > 0 &&
      obj.title.length <= 255
    ) {
      return true;
    } else {
      return false;
    }
  };
  
  //---------------------------------------------------------------------------
  let validateAuthor = (obj) => {
    if (
      typeof obj.author === "string" &&
      obj.author.length > 0 &&
      obj.author.length <= 100 &&
      obj.author !== "" &&
      obj.author !== null
    ) {
      return true;
    } else {
      return false;
    }
  };
  //------------------------------------------------------------------------
  let convertirFecha = (texto) => {
    if (typeof texto === "string") {
      let partes = (texto || "").split("/");
      let fechaGenerada = new Date(partes[2], --partes[1], partes[0]);
      if (partes.length == 3 && fechaGenerada !== undefined) {
        return true;
      } else return false; //Inválida
    } else {
      return false;
    }
  };
  let pastDate = (date) => {
    let partes = (date || "").split("/");
    let fechaGenerada = new Date(partes[2], --partes[1], partes[0]);
    if (fechaGenerada !== undefined && fechaGenerada < new Date()) return true;
    else return false;
  };
  
  let validatemodifiedAt = (obj) => {
    let isPast = pastDate(obj.modifiedAt);
    if (
      convertirFecha(obj.modifiedAt) &&
      obj.modifiedAt !== null &&
      obj.modifiedAt !== "" &&
      isPast
    ) {
      return true;
    } else {
      return false;
    }
  };
  
  // -----------------------------------------------------------------------
  let validPublishedAt = (obj) => {
    let today = new Date();
    if (convertirFecha(obj.publishedAt) && pastDate(obj.publishedAt)) {
      return true;
    } else {
      return false;
    }
  };
  
  //---------------------------------------------------------------------------
  function urlValidation(value) {
    return /^(?:(?:(?:https):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
      value
    );
  }
  
  let validateUrl = (obj) => {
    if (obj.publishedAt === "" && obj.url === "" ) {
      return true;
    } else if (urlValidation(obj.url)) {
      return true;
    } else {
      return false;
    }
  };
  
  //-----------------------------------------------------------------------------
  let validateKeyWords = (obj) => {
    if (
      Array.isArray(obj.keywords) &&
      obj.keywords.length <= 3 &&
      obj.keywords.length > 0 &&
      isString(obj.keywords)
    ) {
      return true;
    } else {
      return false;
    }
  };
  
  function isString(array) {
    let bool = true;
    array.forEach((element) => {
      typeof element === "string" ? bool : (bool = false);
    });
    if (bool === false) return false;
    else return true;
  }
  
  //----------------------------------------------------------------------------
  
  let validateReadMins = (obj) => {
    if (obj.readMins > 0 && obj.readMins <= 20) {
      return true;
    } else return false;
  };
  
  //-----------------------------------------------------------------------------
  let validateSource = (obj) => {
    if (obj.source !== "" && validValueStr(obj.source)) {
      return true;
    } else {
      return false;
    }
  };
  
  let validValueStr = (string) => {
    if (
      string === "ARTICLE" ||
      string === "BLOG" ||
      string === "TWEET" ||
      string == "NEWSPAPER"
    )
      return true;
    else return false;
  };
  
  //-------------------------------------------------------------------------------
  
  // SE EXPORTA MODULO 
  let validate =(obj)=>{
    if(validateId(obj) && validateTitle(obj) && validateAuthor(obj) && validatemodifiedAt(obj) &&  validatemodifiedAt(obj) && validPublishedAt(obj) && validateUrl(obj) &&validateKeyWords(obj) && validateReadMins(obj) &&validateSource(obj))
    return true;
    else
    return false;
  }
  
  module.exports = validate