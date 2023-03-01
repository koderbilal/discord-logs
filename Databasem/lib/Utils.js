const fs = require("fs");
const DatabaseError = require("./Error.js");
const { isArray, stringifyData, validID, validValue } = require("./Functions.js");

class Utils {
    constructor(settings = {}) {
        this.file = settings.file;
        this.spaces = settings.spaces;
        this.seperator = settings.seperator;
        this.errors = {
            dataNotANumber: "Girdiğiniz kimliğe ait veriler 'sayı' türünde değil",
            mustBeANumber: "Girdiğiniz değer 'sayı' türünde değil",
            mustBeArray: "Veriler dizide olmalıdır",
            nonValidID: "Girdiğiniz kimlik geçerli değil",
            nonValidValue: "Girdiğiniz değer geçerli değil",
            notEndsWithDotJson: "Dosyanın uzantısı 'json' olmalıdır",
            undefinedFileName: "Tanımsız dosya adı",
            undefinedID: "tanımsız kimlik",
            undefinedValue: "tanımsız değer",
        }
    };
    
    read() {
        return JSON.parse(fs.readFileSync(this.file, "utf-8"));
    };
    
    write(data) {

        return fs.writeFileSync(this.file, JSON.stringify(data, null, this.spaces));
    };
    _set(id, value) {
        const data = this.read();
        let info = "";
        id.split(this.seperator).forEach((x, y, z) => {
            info += `["${x.replace(/\n/g, "\\n")}"]`;
            if (y === (z.length - 1)) {
                eval(`data${info} = ${stringifyData(value)}`);
            } else {
                if (!eval(`data${info}`)) eval(`data${info} = {};`);
            };
        });
        this.write(data);
        return eval(`data${info}`) || null;
    };
    _delete(id) {
        const data = this.read();
        let info = "";
        id.split(this.seperator).forEach((x, y, z) => {
            info += `["${x.replace(/\n/g, "\\n")}"]`;
            if (y === (z.length - 1)) {
                eval(`data${info} = ${stringifyData(undefined)}`);
            } else {
                if (!eval(`data${info}`)) eval(`data${info} = {};`);
            };
        });
        this.write(data);
        return eval(`data${info}`) || null;
    };
    set(id, value) {
        if (!id) throw new DatabaseError(this.errors.undefinedID);
        if (!validID(id)) throw new DatabaseError(this.errors.nonValidID);
        if (!value) throw new DatabaseError(this.errors.undefinedValue);
        if (!validValue(value)) throw new DatabaseError(this.errors.nonValidValue);
        const data = this.read();
        let info = "";
        id.split(this.seperator).forEach((x, y, z) => {
            info += `["${x.replace(/\n/g, "\\n")}"]`;
            if (y === (z.length - 1))
                eval(`data${info} = ${stringifyData(value)}`);
            else {
                if (!eval(`data${info}`))
                    eval(`data${info} = {};`);
            };
        });
        this.write(data);
        return eval(`data${info}`) || null;
    };
    
    get(id) {
        if (!id) throw new DatabaseError(this.errors.undefinedID);
        if (!validID(id)) throw new DatabaseError(this.errors.nonValidID);
        const data = this.read();
        let info = "";
        id.split(this.seperator).forEach((x, y, z) => {
            info += `["${x.replace(/\n/g, "\\n")}"]`;
            if (y === (z.length - 1)) return;
            if (!eval(`data${info}`)) eval(`data${info} = {};`);
        });
        return eval(`data${info}`) || null;
    };
    
    add(id, value) {
        if (!id) throw new DatabaseError(this.errors.undefinedID);
        if (!validID(id)) throw new DatabaseError(this.errors.nonValidID);
        if (!value) throw new DatabaseError(this.errors.undefinedValue);
        if (!validValue(value)) throw new DatabaseError(this.errors.nonValidValue);
        if (typeof value !== "number") throw new DatabaseError(this.errors.mustBeANumber);
        var data = this.get(id);
        if (!data) return this._set(id, value);
        if (typeof data !== "number") throw new DatabaseError(this.errors.dataNotANumber);
        var count = data + value
        this._set(id, count);
        if (!this.get(id)) return Number(0);
        return Number(this.get(id));
    };
    
    subtract(id, value) {
        return this.add(id, -value)
    };
    all() {
        return this.read();
    };
    has(id) {
        if (!id) throw new DatabaseError(this.errors.undefinedID);
        if (!validID(id)) throw new DatabaseError(this.errors.nonValidID);
        return Boolean(this.get(id));
    };
    delete(id) {
        if (!id) throw new DatabaseError(this.errors.undefinedID);
        if (!validID(id)) throw new DatabaseError(this.errors.nonValidID);
        if (this.get(id) === null) return Boolean(false);
        this._delete(id);
        if (this.get(id) === null) return Boolean(true);
    };
    clear() {
        try {
            this.write({});
        } catch (error) {
            throw new DatabaseError(error);
        };
        return true;
    };
    push(id, value) {
        if (!id) throw new DatabaseError(this.errors.undefinedID);
        if (!validID(id)) throw new DatabaseError(this.errors.nonValidID);
        if (!value) throw new DatabaseError(this.errors.undefinedValue);
        if (!validValue(value)) throw new DatabaseError(this.errors.nonValidValue);
        if (!this.get(id) || this.get(id).length < 1) return this._set(id, [value]) ? this.get(id) : null;
        if (!isArray(this.get(id))) throw new DatabaseError(this.errors.mustBeArray);
        var array = [];
        var data = this.get(id);
        if (data.length === 0) return false;
        data.forEach((val) => array.push(val));
        array.push(value);
        return this._set(id, array) ? this.get(id) : null;
    };
    backup(fileName) {
        if (!fileName) throw new DatabaseError(this.errors.undefinedFileName);
        try {
            fs.writeFileSync(fileName, JSON.stringify(this.read(), null, this.spaces));
            return true;
        } catch (error) {
            throw new DatabaseError(error);
        };
    };
    loadBackup(fileName) {
        const backupFile = JSON.parse(fs.readFileSync(fileName, "utf-8"));
        try {
            fs.writeFileSync(this.file, JSON.stringify(backupFile, null, this.spaces));
            return true;
        } catch (error) {
            throw new DatabaseError(error);
        };
    };
};
module.exports = Utils;