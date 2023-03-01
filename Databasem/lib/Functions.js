function isArray(data) {
    return Boolean(Array.isArray(data));
};
function stringifyData(data) {
    if (typeof data === "string") return `"${data}"`;
    if (typeof data === "number") return data;
    if (typeof data === "object" && !(data instanceof Array)) return JSON.stringify(data);
    if (typeof data === "object" && (data instanceof Array)) return `[${data.map(func => stringifyData(func)).join(",")}]`;
    return data;
};
function validID(id) {
    //if (typeof id !== "string" || id.length < 1 || !id.match(/^[a-zA-Z0-9\.]+$/)) return false;
    return true;
};
function validValue(value) {
    if (typeof value === "string" || typeof value === "number" || typeof value === "object" || typeof value === "boolean" || typeof value === "undefined") return true;
    return false;
};

module.exports = { isArray, stringifyData, validID, validValue };