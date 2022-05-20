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
exports.uploadAndReplaceImages = exports.uploadImage = exports.isFile = exports.FILE_PREFIX = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const form_data_1 = __importDefault(require("form-data"));
const logger_1 = require("../utils/logger");
exports.FILE_PREFIX = 'file:';
const isFile = (value) => typeof value === 'string' && value.startsWith(exports.FILE_PREFIX);
exports.isFile = isFile;
function uploadImage(directus, imagePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const form = new form_data_1.default();
        form.append('file', fs_1.default.createReadStream(imagePath));
        const response = yield directus.files.createOne(form, undefined, {
            requestOptions: {
                headers: Object.assign({}, form.getHeaders()),
            },
        });
        return response === null || response === void 0 ? void 0 : response.id;
    });
}
exports.uploadImage = uploadImage;
const uploadAndReplaceImages = (directus, items, fileRoot = '') => __awaiter(void 0, void 0, void 0, function* () {
    const replacedItems = [];
    for (const item of items) {
        try {
            let itemWithReplacedImage = Object.assign({}, item);
            for (const entry of Object.entries(item)) {
                const key = entry[0];
                const value = entry[1];
                if ((0, exports.isFile)(value) && directus) {
                    // Upload image and replace path with id
                    itemWithReplacedImage = Object.assign(Object.assign({}, itemWithReplacedImage), { [key]: yield uploadImage(directus, path_1.default.join(fileRoot || process.cwd(), `/${value.slice(exports.FILE_PREFIX.length)}`)) });
                }
            }
            replacedItems.push(itemWithReplacedImage);
        }
        catch (e) {
            (0, logger_1.log)(`Error during image upload: ${e}`, logger_1.Level.ERROR);
        }
    }
    return replacedItems;
});
exports.uploadAndReplaceImages = uploadAndReplaceImages;
