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
exports.seedWithImages = exports.seedSingletonWithImages = void 0;
const helper_1 = require("./helper");
const logger_1 = require("../utils/logger");
const seedSingletonWithImages = (directus, collection, data, options) => __awaiter(void 0, void 0, void 0, function* () {
    const [dataWithImages] = yield (0, helper_1.uploadAndReplaceImages)(directus, [data], options.fileRoot);
    (0, logger_1.log)(`Updating singleton ${collection}.`, logger_1.Level.INFO);
    yield directus.singleton(collection).update(dataWithImages);
    (0, logger_1.log)(`Successfully updated singleton ${collection}.`, logger_1.Level.SUCCESS);
});
exports.seedSingletonWithImages = seedSingletonWithImages;
const seedWithImages = (directus, collection, items, options) => __awaiter(void 0, void 0, void 0, function* () {
    if (options.clearTableEntries) {
        const existingItems = yield directus
            .items(collection)
            .readByQuery({ limit: -1 });
        if ((existingItems === null || existingItems === void 0 ? void 0 : existingItems.data) && existingItems.data.length !== 0) {
            (0, logger_1.log)(`Removing ${existingItems.data.length} existing items from ${collection}.`, logger_1.Level.INFO);
            yield directus
                .items(collection)
                .deleteMany(existingItems.data.map((item) => item.id));
        }
    }
    const itemsWithImages = yield (0, helper_1.uploadAndReplaceImages)(directus, items, options.fileRoot);
    (0, logger_1.log)(`Creating items for ${collection} (count: ${itemsWithImages.length}).`, logger_1.Level.INFO);
    yield directus.items(collection).createMany(itemsWithImages);
    (0, logger_1.log)(`Successfully created ${itemsWithImages.length} items for ${collection}.`, logger_1.Level.SUCCESS);
});
exports.seedWithImages = seedWithImages;
