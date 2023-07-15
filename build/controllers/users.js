"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.getAllUser = exports.getAllUsers = void 0;
const error_handle_1 = require("../utils/error.handle");
const users_1 = require("../services/users");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, users_1.getUsers)();
        return res.status(200).json(users);
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERROR_GET_USERS", new error_handle_1.ValidationGetUsersError('ERROR_GET_USERS'));
        return res.sendStatus(400);
    }
});
exports.getAllUsers = getAllUsers;
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id)
            res.status(400);
        const user = yield (0, users_1.getUser)(id);
        return res.status(200).json(user);
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res.status(400), "ERROR_GET_USER", new error_handle_1.ValidationGetUsersError('ERROR_GET_USER'));
        return res.status(400);
    }
});
exports.getAllUser = getAllUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedUser = yield (0, users_1.deleteUserById)(id);
        return res.json(deletedUser);
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERROR_DELETE_USER", new error_handle_1.ValidationDeleteUserError('ERROR_DELETE_USER'));
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { username } = req.body;
        if (!username) {
            return res.sendStatus(400);
        }
        const user = yield (0, users_1.getUserById)(id);
        user.username = username;
        yield user.save();
        return res.status(200).json(user).end();
    }
    catch (error) {
        (0, error_handle_1.handleHttp)(res, "ERROR_UPDATE_USER", new error_handle_1.ValidationUpdateUserError('ERROR_UPDATE_USER'));
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.updateUser = updateUser;
