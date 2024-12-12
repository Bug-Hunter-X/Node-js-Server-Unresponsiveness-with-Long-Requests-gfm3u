const express = require('express');
const app = express();
const { Worker } = require('worker_threads');
app.get('/', (req, res) => {
  const worker = new Worker('./longTask.js');
  worker.on('message', result => {
    res.send(result);
  });
  worker.on('error', err => {
    console.error(err);
    res.status(500).send('Error processing request');
  });
});
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
// longTask.js
setTimeout(() => {
  postMessage('Hello World!');
}, 5000);