module.exports.BAD_REQUEST = 400; // invalid data
module.exports.UNAUTHORIZED = 401; // no/invalid token
module.exports.FORBIDDEN = 403; // valid user, but not allowed
module.exports.NOT_FOUND = 404; // resource not found
module.exports.CONFLICT = 409; // duplicate email, etc.
module.exports.INTERNAL_SERVER_ERROR = 500; // fallback
