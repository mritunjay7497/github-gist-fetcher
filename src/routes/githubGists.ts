import { Router } from "express";
import { getUserGist, getGistById, toggleGistFavorite } from "../modules/githubGists"

const router: Router = Router();

router.post("/gistByUser", getUserGist);
router.post("/gistById", getGistById);
router.post("/toggleFav", toggleGistFavorite);

export default router