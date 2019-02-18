import express from 'express';
import parseArgs from 'minimist';

import Pomodoro from './pomodoro/Pomodoro';

const app = express()

app.use(express.json())

//console.log("HERE", parseArgs(process.argv))

app.get('/', (_, res) => {
  return res.status(200).send("working");
});

app.get('/state', (_, res) => {
  const pomodoro_state = Pomodoro.state();
  return res.status(200).send(pomodoro_state)
});

app.get('/toggle', (_, res) => {
  Pomodoro.toggle();
  return res.status(200).send()
});

app.get('/reset', (_, res) => {
  Pomodoro.reset();
  return res.status(200).send()
});

app.listen(3000);

console.log('app running on port ', 3000);