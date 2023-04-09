const cleanProperties = (data, allowedProperties) => {
    /* clean the json of any unwanted properties */
    const cleanJson = {}
    Object.keys(data).forEach(
            property => // for property
            allowedProperties[property] &&  // if is make as acceptable
            (cleanJson[property] = data[property]) // pass to new obj
    );
    return cleanJson;
}

const emailValidator = (email) => { 
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

const passwordValidator = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(password);
}

module.exports = { cleanProperties, emailValidator, passwordValidator };