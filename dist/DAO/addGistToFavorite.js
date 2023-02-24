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
exports.toggleGistToFavorite = void 0;
const db_1 = require("../config/db");
const toggleGistToFavorite = (userId, gistUrl, isFavourite, gistId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbClient = yield (0, db_1.initializeConnection)();
        const addToFavSQL = `
            INSERT INTO github.gist (user_id,gist_url,gist_id,fav)
            VALUES ($1,$2,$3,$4)
            ON CONFLICT (gist_id) DO UPDATE SET fav = $4
        `;
        const query = {
            text: addToFavSQL,
            values: [userId, gistUrl, gistId, isFavourite]
        };
        const result = yield dbClient.query(query);
        return !!result.rowCount;
    }
    catch (error) {
        console.log(error.message);
        return false;
    }
});
exports.toggleGistToFavorite = toggleGistToFavorite;
