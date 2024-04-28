import express from "express";
import { getPayload } from "./get-payload";
import { nextApp, nextHandler } from "./next-utils";

const app = express();
const PORT = 3000 || process.env.PORT;

const run = async() => {
    const payload = await getPayload({
        initOptions: {
            express: app,
            onInit: async (cms) => {
                cms.logger.info(`Admin URL ${cms.getAdminURL()}`)
            }
        }
    });

    app.use((req, res) => nextHandler(req, res))

    nextApp.prepare().then(() => {
        payload.logger.info("Started")
    
        app.listen(PORT, async() => {
            payload.logger.info(`App URL : ${process.env.NEXT_PUBLIC_SERVER_URL}`)
        })
    })
}

run()