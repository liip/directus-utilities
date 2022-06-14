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
exports.getPublicPermissions = void 0;
const getPublicPermissions = (directus) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const permissions = yield directus.permissions.readByQuery({
        limit: -1,
        filter: {
            role: {
                _null: true,
            },
        },
    });
    return permissions.data && ((_a = permissions.data) === null || _a === void 0 ? void 0 : _a.length) > 0
        ? permissions.data
        : null;
});
exports.getPublicPermissions = getPublicPermissions;
