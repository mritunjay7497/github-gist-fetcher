"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const githubGists_1 = require("../modules/githubGists");
const router = (0, express_1.Router)();
router.post("/gistByUser", githubGists_1.getUserGist);
router.post("/gistById", githubGists_1.getGistById);
router.post("/toggleFav", githubGists_1.toggleGistFavorite);
exports.default = router;
