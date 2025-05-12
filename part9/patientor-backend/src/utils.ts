import { z } from 'zod';
import { Gender, NewPatient } from './types';

const EntrySchema = z.object({
  id: z.string(),
  type: z.enum(["HealthCheck", "Hospital", "OccupationalHealthcare"]),
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(EntrySchema)
});

export const toNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};
