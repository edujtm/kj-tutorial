"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getTodos = void 0;
var typeorm_1 = require("typeorm");
var todo_1 = __importDefault(require("../../models/todo"));
var getTodos = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var todoRepo, todos, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                todoRepo = typeorm_1.getRepository(todo_1.default);
                return [4 /*yield*/, todoRepo.find()];
            case 1:
                todos = _a.sent();
                res.status(200).json({ todos: todos });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                throw error_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getTodos = getTodos;
var addTodo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, todoRepo, todo, allTodos, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                body = req.body;
                todoRepo = typeorm_1.getRepository(todo_1.default);
                todo = new todo_1.default();
                todo.name = body.name;
                todo.description = body.description;
                todo.status = body.status;
                return [4 /*yield*/, todoRepo.save(todo)];
            case 1:
                _a.sent();
                return [4 /*yield*/, todoRepo.find()];
            case 2:
                allTodos = _a.sent();
                res.status(201)
                    .json({ message: "Todo Created", todo: todo, todos: allTodos });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                throw error_2;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.addTodo = addTodo;
var updateTodo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, body, todoRepo, todo, updateTodo_1, allTodos, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                id = req.params.id, body = req.body;
                todoRepo = typeorm_1.getRepository(todo_1.default);
                return [4 /*yield*/, todoRepo.findOne(id)];
            case 1:
                todo = _a.sent();
                if (!!todo) return [3 /*break*/, 2];
                res.status(400).json({
                    error: "This Todo does not exist on the database."
                });
                return [3 /*break*/, 6];
            case 2: return [4 /*yield*/, todoRepo.update(todo.id, __assign({}, body))];
            case 3:
                _a.sent();
                return [4 /*yield*/, todoRepo.findOne(id)];
            case 4:
                updateTodo_1 = _a.sent();
                return [4 /*yield*/, todoRepo.find()];
            case 5:
                allTodos = _a.sent();
                res.status(200).json({
                    message: "Todo updated!",
                    todo: updateTodo_1,
                    todos: allTodos
                });
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                error_3 = _a.sent();
                throw error_3;
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.updateTodo = updateTodo;
var deleteTodo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var todoRepo, todo, deletedTodo, allTodos, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                todoRepo = typeorm_1.getRepository(todo_1.default);
                return [4 /*yield*/, todoRepo.findOne(req.params.id)];
            case 1:
                todo = _a.sent();
                if (!todo) {
                    res.status(400).json({
                        error: "This Todo does not exist on the database."
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, todoRepo.remove(todo)];
            case 2:
                deletedTodo = _a.sent();
                return [4 /*yield*/, todoRepo.find()];
            case 3:
                allTodos = _a.sent();
                res.status(200).json({
                    message: "Todo deleted",
                    todo: deletedTodo,
                    todos: allTodos,
                });
                return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                throw error_4;
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteTodo = deleteTodo;