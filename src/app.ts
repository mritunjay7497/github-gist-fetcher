import express, { Application } from "express";
import cors from "cors";
import { githubGist } from "./routes";



const PORT = process.env.PORT || 5000;

const app: Application = express();

app.use(cors());

app.use(
    express.json({ limit: '50mb' }),
    express.urlencoded({
        extended: true,
        limit: '50mb'
    })
);

app.use("/", githubGist)


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

