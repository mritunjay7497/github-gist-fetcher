import { Router } from "express";
import { getUserGist, getGistById, toggleGistFavorite, getFavGist } from "../modules/githubGists"

const router: Router = Router();

router.post("/gistByUser", getUserGist);
router.post("/gistById", getGistById);
router.post("/toggleFav", toggleGistFavorite);
router.get("/getFavorite", getFavGist);

export default router