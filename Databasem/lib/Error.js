class DatabaseError extends Error {
    constructor(message = "Unknown Error") {
        super();
        this.name = "nopedb";
        this.message = message;
    };
};
module.exports = DatabaseError;