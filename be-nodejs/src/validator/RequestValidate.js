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

module.exports = { cleanProperties };