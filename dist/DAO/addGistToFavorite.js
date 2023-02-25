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
exports.getAllFavoriteGist = exports.saveFavGistUserDetails = exports.toggleGistToFavorite = void 0;
const db_1 = require("../config/db");
const toggleGistToFavorite = (userId, gistUrl, isFavourite, gistId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbClient = yield (0, db_1.initializeConnection)();
        const toggleFavSQL = `
            INSERT INTO github.gist (user_id,gist_url,gist_id,fav)
            VALUES ($1,$2,$3,$4)
            ON CONFLICT (gist_id) DO UPDATE SET fav = $4
        `;
        const query = {
            text: toggleFavSQL,
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
const saveFavGistUserDetails = (userId, userUrl, username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbClient = yield (0, db_1.initializeConnection)();
        const saveUserDetailsSQL = `
            INSERT INTO github.user (username,url,user_id)
            VALUES ($1,$2,$3)
            ON CONFLICT(user_id) DO NOTHING
        `;
        const query = {
            text: saveUserDetailsSQL,
            values: [username, userUrl, userId]
        };
        const result = yield dbClient.query(query);
        return !!result.rows;
    }
    catch (error) {
        return false;
    }
});
exports.saveFavGistUserDetails = saveFavGistUserDetails;
const getAllFavoriteGist = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbClient = yield (0, db_1.initializeConnection)();
        const getAllFavSQL = `
            SELECT gg.user_id,gg.gist_url,gg.gist_id,gg.fav as isFavorite, gu.username, gu.url as user_url
            FROM github.gist gg
            LEFT JOIN github.user gu
            ON gu.user_id = gg.user_id
            WHERE gg.fav = true
        `;
        const query = {
            text: getAllFavSQL
        };
        const result = yield dbClient.query(query);
        return result.rows;
    }
    catch (error) {
        console.log(error.message);
        return false;
    }
});
exports.getAllFavoriteGist = getAllFavoriteGist;
