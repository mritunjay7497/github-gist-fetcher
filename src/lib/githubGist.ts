/*
* Library to fetch public gists from github
* Documentation Link: "https://developer.github.com/v3/gists/"
**/

import axios from "axios";
import { saveFavGistUserDetails, toggleGistToFavorite } from "../DAO/addGistToFavorite";

const headers = {
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28"
}

/**
    *  Fetch all the public gists of a user gtom github
    * API: https://api.github.com/users/{USERNAME}/gists
    * Method: GET
    * @params : username
*/

export const getPublicGistOfUser = async (GITHUB_URL: string, username: string): Promise<Record<string, any>[] | boolean> => {
    try {
        if (username) {
            const publicGists: Record<string, any>[] = (await axios.get(
                `${GITHUB_URL}/users/${username}/gists`,
                {
                    headers
                }
            )).data
            return publicGists
        } else {
            throw new Error("Invalid username")
        }
    } catch (error: any) {
        console.log(error)
        return false
    }
};

//
//
/**
 * Fetch a public gist using gist-id
 * API: https://api.github.com/gists/{GIST_ID}
 * Method: GET
 * @params : gist-id
 */

export const getPublicGistById = async (GITHUB_URL: string, gistId: string): Promise<Record<string, any> | boolean> => {

    try {
        if (gistId) {
            const gistById: Record<string, any> = (await axios.get(
                `${GITHUB_URL}/gists/${gistId}`,
                {
                    headers
                }
            )).data
            return gistById
        } else {
            throw new Error("Invalid gist-id")
        }
    } catch (error: any) {
        console.log(error)
        return false
    }
};

/**
 * Mark a gist as favorite using gist-id
 * API: https://api.github.com/gists/{GIST_ID}
 * DB_API: _
 * Method: PUT
 * @params : gist-id
 */

export const toggleFavorite = async (GITHUB_URL: string, gistId: string, isFavourite: boolean): Promise<boolean> => {

    try {

        const gistById: Record<string, any> = (await axios.get(
            `${GITHUB_URL}/gists/${gistId}`,
            {
                headers
            }
        )).data;

        if (gistById) {

            const userId: bigint = gistById.owner.id;
            const gistUrl: string = gistById.url;
            const username: string = gistById.owner.id;
            const userUrl: string = gistById.owner.html_url;

            const starGist = await Promise.all([
                toggleGistToFavorite(userId, gistUrl, isFavourite, gistId),
                saveFavGistUserDetails(userId, username, userUrl)
            ])
            if (!starGist.includes(false)) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }

    } catch (error: any) {
        console.log(error)
        return false
    }
};

