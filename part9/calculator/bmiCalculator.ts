interface InputValues {
  heightCm: number;
  weightKg: number;
}

const parseBmiArguments = (args: string[]): InputValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  const heightCm = Number(args[2]);
  const weightKg = Number(args[3]);

  if (!isNaN(heightCm) && !isNaN(weightKg)) {
    if (heightCm < 0 || weightKg < 0) {
      throw new Error('Provided values were not positive numbers!');
    }

    return {
      heightCm: heightCm,
      weightKg: weightKg
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (heightCm: number, weightKg: number) : string => {
  //console.log(`Calculating BMI for height: ${heightCm} cm, weight: ${weightKg} kg`);

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  //console.log(`Calculated BMI: ${bmi}`);

  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 25) {
    return 'Overweight';
  }
  return 'Normal range';
}

try {
  const { heightCm, weightKg } = parseBmiArguments(process.argv);
  console.log(calculateBmi(heightCm, weightKg));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
