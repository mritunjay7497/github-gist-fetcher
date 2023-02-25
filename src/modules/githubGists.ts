import { Request, Response } from "express";
import { getPublicGistOfUser, getPublicGistById, toggleFavorite } from "../lib/githubGist";
import { getAllFavoriteGist } from "../DAO/addGistToFavorite"

const GITHUB_BASE_URL = "https://api.github.com";


export const getUserGist = async (req: Request, res: Response): Promise<any> => {
    try {
        const { username }: { username: string } = req.body;
        if (username) {
            const publicGists: Record<string, any>[] | boolean = await getPublicGistOfUser(GITHUB_BASE_URL, username);
            if (publicGists instanceof Array) {
                return res.status(200).json({
                    status: true,
                    message: publicGists
                })
            } else {
                return res.status(500).json({
                    status: false,
                    message: `Some error occured while retrieving public gists for user - ${username}`
                })
            }
        } else {
            return res.status(400).json({
                status: false,
                message: "Invalid username"
            })
        }

    } catch (error: any) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
};

export const getGistById = async (req: Request, res: Response): Promise<any> => {
    try {
        const { gistId }: { gistId: string } = req.body
        if (gistId) {
            const requiredGist: Record<string, any> | boolean = await getPublicGistById(GITHUB_BASE_URL, gistId);
            if (requiredGist instanceof Object) {
                return res.status(200).json({
                    status: true,
                    message: requiredGist
                })
            } else {
                return res.status(500).json({
                    status: false,
                    message: `Some error occured while retrieving public gists for gist-id - ${gistId}`
                })
            }
        } else {
            return res.status(400).json({
                status: false,
                message: "Invalid gist-id"
            })
        }
    } catch (error: any) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
};

export const toggleGistFavorite = async (req: Request, res: Response): Promise<Record<string, any>> => {
    try {
        const { gistId, isFavourite }: { gistId: string, isFavourite: boolean } = req.body;
        if (gistId) {

            const markedFav: boolean = await toggleFavorite(GITHUB_BASE_URL, gistId, isFavourite);
            
            if (markedFav) {
                return res.status(200).json({
                    status: true,
                    message: isFavourite ? `gist-id ${gistId} marked as favourite` : `gist-id ${gistId} removed from favourites`
                })
            } else {
                return res.status(500).json({
                    status: false,
                    message: `Some error occured while marking gist ${gistId} as favourite`
                })
            }
        } else {
            return res.status(400).json({
                status: false,
                message: "Invalid gist-id"
            })
        }
    } catch (error: any) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
};

export const getFavGist = async (req: Request, res: Response): Promise<Record<string, any>> => {
    try {
        const favoriteGistList: Record<string, any>[] | boolean = await getAllFavoriteGist();
        if (favoriteGistList) {
            return res.status(200).json({
                status: false,
                message: favoriteGistList
            })
        } else {
            return res.status(500).json({
                status: false,
                message: "Some error occured while fetching favorite gists"
            })
        }
    } catch (error: any) {
        return res.status(500).json({
            status: false,
            message: error
        })
    }
};