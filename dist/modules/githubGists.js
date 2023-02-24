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
exports.toggleGistFavorite = exports.getGistById = exports.getUserGist = void 0;
const githubGist_1 = require("../lib/githubGist");
const GITHUB_BASE_URL = "https://api.github.com";
const getUserGist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        if (username) {
            const publicGists = yield (0, githubGist_1.getPublicGistOfUser)(GITHUB_BASE_URL, username);
            if (publicGists instanceof Array) {
                return res.status(200).json({
                    status: true,
                    message: publicGists
                });
            }
            else {
                return res.status(500).json({
                    status: false,
                    message: `Some error occured while retrieving public gists for user - ${username}`
                });
            }
        }
        else {
            return res.status(400).json({
                status: false,
                message: "Invalid username"
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
});
exports.getUserGist = getUserGist;
const getGistById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { gistId } = req.body;
        if (gistId) {
            const requiredGist = yield (0, githubGist_1.getPublicGistById)(GITHUB_BASE_URL, gistId);
            if (requiredGist instanceof Object) {
                return res.status(200).json({
                    status: true,
                    message: requiredGist
                });
            }
            else {
                return res.status(500).json({
                    status: false,
                    message: `Some error occured while retrieving public gists for gist-id - ${gistId}`
                });
            }
        }
        else {
            return res.status(400).json({
                status: false,
                message: "Invalid gist-id"
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
});
exports.getGistById = getGistById;
const toggleGistFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { gistId, isFavourite } = req.body;
        if (gistId) {
            const markedFav = yield (0, githubGist_1.toggleFavorite)(GITHUB_BASE_URL, gistId, isFavourite);
            if (markedFav) {
                return res.status(200).json({
                    status: true,
                    message: isFavourite ? `gist-id ${gistId} marked as favourite` : `gist-id ${gistId} removed from favourites`
                });
            }
            else {
                return res.status(500).json({
                    status: false,
                    message: `Some error occured while marking gist ${gistId} as favourite`
                });
            }
        }
        else {
            return res.status(400).json({
                status: false,
                message: "Invalid gist-id"
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
});
exports.toggleGistFavorite = toggleGistFavorite;
