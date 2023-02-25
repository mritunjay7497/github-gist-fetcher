import { Pool, QueryConfig, QueryResult } from "pg";
import { initializeConnection } from "../config/db";

export const toggleGistToFavorite = async (userId: bigint, gistUrl: string, isFavourite: boolean, gistId: string): Promise<boolean> => {
    try {

        const dbClient: Pool = await initializeConnection();
        const toggleFavSQL: string = `
            INSERT INTO github.gist (user_id,gist_url,gist_id,fav)
            VALUES ($1,$2,$3,$4)
            ON CONFLICT (gist_id) DO UPDATE SET fav = $4
        `;
        const query: QueryConfig = {
            text: toggleFavSQL,
            values: [userId, gistUrl, gistId, isFavourite]
        }
        const result: QueryResult = await dbClient.query(query);
        return !!result.rowCount;
    } catch (error: any) {
        console.log(error.message)
        return false
    }
};

export const saveFavGistUserDetails = async (userId: bigint, userUrl: string, username: string): Promise<boolean> => {
    try {
        const dbClient: Pool = await initializeConnection();
        const saveUserDetailsSQL: string = `
            INSERT INTO github.user (username,url,user_id)
            VALUES ($1,$2,$3)
            ON CONFLICT(user_id) DO NOTHING
        `;
        const query: QueryConfig = {
            text: saveUserDetailsSQL,
            values: [username, userUrl, userId]
        };
        const result: QueryResult = await dbClient.query(query);
        return !!result.rows
    } catch (error) {
        return false
    }
};

export const getAllFavoriteGist = async (): Promise<Record<string, any>[] | boolean> => {
    try {
        const dbClient: Pool = await initializeConnection();
        const getAllFavSQL: string = `
            SELECT gg.user_id,gg.gist_url,gg.gist_id,gg.fav as isFavorite, gu.username, gu.url as user_url
            FROM github.gist gg
            LEFT JOIN github.user gu
            ON gu.user_id = gg.user_id
            WHERE gg.fav = true
        `;
        const query: QueryConfig = {
            text: getAllFavSQL
        }
        const result: QueryResult = await dbClient.query(query);
        return result.rows;
    } catch (error: any) {
        console.log(error.message);
        return false
    }
};