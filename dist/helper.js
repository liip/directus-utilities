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
exports.getDefaultPresetForCollection = void 0;
const getDefaultPresetForCollection = (directus, collection) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const presets = yield directus.presets.readByQuery({
        filter: {
            collection: {
                _eq: collection,
            },
            user: {
                _null: true,
            },
            bookmark: {
                _null: true,
            },
        },
        limit: 1,
    });
    return presets.data && ((_a = presets.data) === null || _a === void 0 ? void 0 : _a.length) > 0 ? presets.data[0] : null;
});
exports.getDefaultPresetForCollection = getDefaultPresetForCollection;
