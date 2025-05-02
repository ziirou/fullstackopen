import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const heightCm = Number(req.query.height);
  const weightKg = Number(req.query.weight);

  if (isNaN(heightCm) || isNaN(weightKg) || heightCm <= 0 || weightKg <= 0) {
    res.status(400).json({ error: 'malformatted parameters' });
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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!target || !daily_exercises) {
    res.status(400).json({ error: 'parameters missing' });
    return;
  }

  if (
    isNaN(Number(target)) ||
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((h) => isNaN(Number(h)) || Number(h) < 0)
  ) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  const dailyExercises = daily_exercises.map((h) => Number(h));

  const result = calculateExercises(Number(target), dailyExercises);

  res.status(200).json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
