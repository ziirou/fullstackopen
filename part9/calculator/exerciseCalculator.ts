interface ExerciseValues {
  targetHours: number;
  dailyExerciseHours: number[];
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const targetHours = Number(args[2]);
  if (isNaN(targetHours)) {
    throw new Error('Provided target argument is not number!');
  } else if (targetHours < 0) {
    throw new Error('Provided target argument is not positive number!');
  }

  const dailyHours = args.slice(3).map((hoursArg) => {
    const hours = Number(hoursArg);
    if (isNaN(hours)) {
      throw new Error('Provided hours were not numbers!');
    } else if (hours < 0) {
      throw new Error('Provided hours were not positive numbers!');
    }
    return hours;
  });

  return {
    targetHours: targetHours,
    dailyExerciseHours: [...dailyHours]
  };
};

export const calculateExercises = (targetHours: number, dailyExerciseHours: number[]) : Result => {
  const periodLength = dailyExerciseHours.length;
  let trainingDays = 0;
  let totalHours = 0;

  dailyExerciseHours.forEach(element => {
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
  };
};

if (require.main === module) {
  try {
    const { targetHours, dailyExerciseHours } = parseArguments(process.argv);
    console.log(calculateExercises(targetHours, dailyExerciseHours));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}
