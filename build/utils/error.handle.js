"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationDeleteError = exports.ValidationUpdateError = exports.ValidationPostError = exports.ValidationGetError = exports.ValidationDeleteUserError = exports.ValidationGetUsersError = exports.ValidationUpdateUserError = exports.ValidationLoginError = exports.ValidationRegisterError = exports.ValidationCredencialError = exports.MiddlewareError = exports.ValidationError = exports.ConnectionError = exports.handleHttp = void 0;
const handleHttp = (res, error, errorRaw) => {
    console.log(errorRaw);
    res.status(500);
    res.send({ error });
};
exports.handleHttp = handleHttp;
const createErrorFactory = (name) => {
    return class CostumizedError extends Error {
        constructor(message) {
            super(message);
            this.name = name;
        }
    };
};
exports.ConnectionError = createErrorFactory('ConnectionError');
exports.ValidationError = createErrorFactory('ValidationError');
exports.MiddlewareError = createErrorFactory('MiddlewareError');
exports.ValidationCredencialError = createErrorFactory('ValidationCredencialError');
exports.ValidationRegisterError = createErrorFactory('ValidationPasswordError');
exports.ValidationLoginError = createErrorFactory('ValidationLoginError');
exports.ValidationUpdateUserError = createErrorFactory('ValidationGetUserError');
exports.ValidationGetUsersError = createErrorFactory('ValidationGetUsersError');
exports.ValidationDeleteUserError = createErrorFactory('ValidationDeleteUserError');
exports.ValidationGetError = createErrorFactory('ValidationGetError');
exports.ValidationPostError = createErrorFactory('ValidationPostError');
exports.ValidationUpdateError = createErrorFactory('ValidationUpdateError');
exports.ValidationDeleteError = createErrorFactory('ValidationDeleteError');
