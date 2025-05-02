interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyExerciseHours: number[]) : Result => {
  const periodLength = dailyExerciseHours.length;
  let trainingDays = 0;
  let totalHours = 0;
  const targetHours = 2;

  dailyExerciseHours.forEach(element => {
    if (isNaN(element)) {
      throw new Error('Provided values were not numbers!');
    } else if (element < 0) {
      throw new Error('Provided values were not positive numbers!');
    }

    if (element > 0) {
      trainingDays++;
      totalHours += element;
    }
  });

  const averageHours = totalHours / periodLength;
  const success = averageHours >= targetHours;

  const rating = success ? 3 : (averageHours >= targetHours / 2 ? 2 : 1);
  let ratingDescription = '';
  switch (rating) {
    case 1:
      ratingDescription = 'You could do a lot better..';
      break;
    case 2:
      ratingDescription = 'Not too bad but could be better.';
      break;
    case 3:
      ratingDescription = 'Great job!';
      break;
    default:
      ratingDescription = 'Unknown rating';
  }

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: targetHours,
    average: averageHours
  }
}

try {
  console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1]));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
