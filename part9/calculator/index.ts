import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const heightCm = Number(req.query.height);
  const weightKg = Number(req.query.weight);

  if (isNaN(heightCm) || isNaN(weightKg) || heightCm <= 0 || weightKg <= 0) {
    res.status(400).json({ error: 'malformatted parameters' })
    return;
  }

  const bmi = calculateBmi(heightCm, weightKg);

  const bmiData = {
    height: heightCm,
    weight: weightKg,
    bmi
  };

  res.status(200).json(bmiData);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
