"use strict";
/*
* Library to fetch public gists from github
* Documentation Link: "https://developer.github.com/v3/gists/"
**/
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
exports.toggleFavorite = exports.getPublicGistById = exports.getPublicGistOfUser = void 0;
const axios_1 = __importDefault(require("axios"));
const addGistToFavorite_1 = require("../DAO/addGistToFavorite");
const headers = {
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28"
};
/**
    *  Fetch all the public gists of a user gtom github
    * API: https://api.github.com/users/{USERNAME}/gists
    * Method: GET
    * @params : username
*/
const getPublicGistOfUser = (GITHUB_URL, username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (username) {
            const publicGists = (yield axios_1.default.get(`${GITHUB_URL}/users/${username}/gists`, {
                headers
            })).data;
            return publicGists;
        }
        else {
            throw new Error("Invalid username");
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.getPublicGistOfUser = getPublicGistOfUser;
//
//
/**
 * Fetch a public gist using gist-id
 * API: https://api.github.com/gists/{GIST_ID}
 * Method: GET
 * @params : gist-id
 */
const getPublicGistById = (GITHUB_URL, gistId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (gistId) {
            const gistById = (yield axios_1.default.get(`${GITHUB_URL}/gists/${gistId}`, {
                headers
            })).data;
            return gistById;
        }
        else {
            throw new Error("Invalid gist-id");
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.getPublicGistById = getPublicGistById;
/**
 * Mark a gist as favorite using gist-id
 * API: https://api.github.com/gists/{GIST_ID}
 * DB_API: _
 * Method: PUT
 * @params : gist-id
 */
const toggleFavorite = (GITHUB_URL, gistId, isFavourite) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gistById = (yield axios_1.default.get(`${GITHUB_URL}/gists/${gistId}`, {
            headers
        })).data;
        if (gistById) {
            const userId = gistById.owner.id;
            const gistUrl = gistById.url;
            const username = gistById.owner.id;
            const userUrl = gistById.owner.html_url;
            const starGist = yield Promise.all([
                (0, addGistToFavorite_1.toggleGistToFavorite)(userId, gistUrl, isFavourite, gistId),
                (0, addGistToFavorite_1.saveFavGistUserDetails)(userId, username, userUrl)
            ]);
            if (!starGist.includes(false)) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.toggleFavorite = toggleFavorite;
