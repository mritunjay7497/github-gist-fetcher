import { Pool, QueryConfig, QueryResult } from "pg";
import { initializeConnection } from "../config/db";

export const toggleGistToFavorite = async (userId: bigint, gistUrl: string, isFavourite: boolean, gistId: string): Promise<boolean> => {
    try {

        const dbClient: Pool = await initializeConnection();
        const addToFavSQL: string = `
            INSERT INTO github.gist (user_id,gist_url,gist_id,fav)
            VALUES ($1,$2,$3,$4)
            ON CONFLICT (gist_id) DO UPDATE SET fav = $4
        `;
        const query: QueryConfig = {
            text: addToFavSQL,
            values: [userId, gistUrl, gistId, isFavourite]
        }
        const result: QueryResult = await dbClient.query(query);
        return !!result.rowCount;
    } catch (error:any) {
        console.log(error.message)
        return false
    }
};
