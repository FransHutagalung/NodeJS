import { Request, Router ,Response } from "express";
import { Worker } from "worker_threads";
import path from "path";

const workerRouter = Router();

workerRouter.get("/non-blocking", (req:Request, res:Response) => {
    res.status(200).json({message : "Hello from non-blocking worker"});
})

workerRouter.get("/blocking", async  (req:Request, res:Response) => {
   
    const worker = new Worker(path.resolve(__dirname, "../controllers/worker.js"),{
        workerData: {
            name: "worker"
        }
    });

    worker.on("message", (message) => {
        res
        .status(200)
        .json(message)
    })

    worker.on("error", (err) => {
        console.error("Worker error: ", err);
    });
    
    worker.on("exit", (code) => {
        if (code !== 0) {
            console.error(`Worker stopped with exit code ${code}`);
        }
    });
    

   
}) 

export default workerRouter