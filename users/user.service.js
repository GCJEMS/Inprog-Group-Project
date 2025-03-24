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

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

Object.defineProperty(exports, "__esModule", { value: true });

exports.userService = void 0;

const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("../_helpers/db"));

exports.userService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_1.default.User.findAll();
    });
}

function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return getUser(id);
    });
}

function create(params) {
    return __awaiter(this, void 0, void 0, function* () {
        if (yield db_1.default.User.findOne({ where: { email: params.email } })) {
            throw `Email "${params.email}" is already registered`;
        }
        const user = new db_1.default.User(params);
        user.passwordHash = yield bcryptjs_1.default.hash(params.password, 10);
        yield user.save();
    });
}

function update(id, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield getUser(id);
        if (params.password) {
            params.passwordHash = yield bcryptjs_1.default.hash(params.password, 10);
        }
        Object.assign(user, params);
        yield user.save();
    });
}

function _delete(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield getUser(id);
        yield user.destroy();
    });
}

function getUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield db_1.default.User.findByPk(id);
        if (!user)
            throw 'User not found';
        return user;
    });
}