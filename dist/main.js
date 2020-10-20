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
var electron_1 = require("electron");
var path_1 = __importDefault(require("path"));
var globals_1 = require("./globals/globals");
var store_1 = __importDefault(require("./services/store"));
var Main = /** @class */ (function () {
    function Main() {
    }
    Main.prototype.createWindow = function () {
        var _this = this;
        var store = new store_1.default();
        var mainWindow = new electron_1.BrowserWindow({
            backgroundColor: "#060606",
            minWidth: 850,
            minHeight: 650,
            minimizable: false,
            maximizable: false,
            // resizable: false,
            // frame: false,
            webPreferences: {
                nodeIntegration: true,
                webSecurity: false,
            },
        });
        var mainURL = "file://" + path_1.default.join(__dirname, "./public/index.html");
        (function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, mainWindow.loadURL(mainURL)];
        }); }); })();
        electron_1.ipcMain.on(globals_1.STORE, function (event, message) {
            var operation = message[0];
            var key = message[1];
            var value = message[2];
            switch (operation) {
                case globals_1.GET:
                    mainWindow.webContents.send(globals_1.STORE, key, store.get(key));
                    break;
                case globals_1.ADD:
                    store.add(key, value);
                    break;
                case globals_1.DELETE:
                    store.delete(key, parseInt(value));
                    break;
            }
        });
        electron_1.app.on("window-all-closed", function () {
            electron_1.app.quit();
        });
        electron_1.app.on("activate", function () {
            if (electron_1.BrowserWindow.getAllWindows().length === 0)
                _this.createWindow();
        });
        electron_1.app.on("before-quit", function () {
            store.set();
        });
        // mainWindow.webContents.openDevTools();
    };
    Main.prototype.start = function () {
        electron_1.app.whenReady().then(this.createWindow);
    };
    return Main;
}());
exports.default = Main;
