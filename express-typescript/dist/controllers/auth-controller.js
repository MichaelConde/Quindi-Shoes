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
const AuthDto_1 = __importDefault(require("../Dto/AuthDto"));
const UserServices_1 = __importDefault(require("../services/ModuloUsuarios/UserServices"));
const generateToken_1 = __importDefault(require("../Helpers/generateToken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let auth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { correo, contraseña } = req.body;
        const login = yield UserServices_1.default.login(new AuthDto_1.default(correo, contraseña));
        if (login.logged) {
            return res.status(200).json({
                status: login.status,
                token: (0, generateToken_1.default)({ id: login.id }, process.env.KEY_TOKEN, 5)
            });
        }
        return res.status(401).json({
            status: login.status
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = auth;
