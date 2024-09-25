const { parentPort , workerData } = require("worker_threads");

console.log(workerData.name);

let counter = 0 ;
for (let i = 0; i < 10_000_000_000 ; i++) {
    counter++;
}

parentPort.postMessage({
    message : counter ,
    status : true
});
