const calculateBmi = (heightCm: number, weightKg: number) : string => {
  if (isNaN(heightCm) || isNaN(weightKg)) {
    throw new Error('Provided values were not numbers!');
  } else if (heightCm <= 0 || weightKg <= 0) {
    throw new Error('Provided values were not positive numbers!');
  }

  console.log(`Calculating BMI for height: ${heightCm} cm, weight: ${weightKg} kg`);

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  console.log(`Calculated BMI: ${bmi}`);

  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 25) {
    return 'Overweight';
  }
  return 'Normal range';
}

console.log(calculateBmi(180, 74));
console.log(calculateBmi(150, 74));
console.log(calculateBmi(200, 50));
