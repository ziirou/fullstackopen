import express, { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import patientService from '../services/patientService';
import { NewPatientSchema } from '../utils';
import { Patient, NewPatient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log('someone fetched patients');
  res.send(patientService.getNonSensitivePatients());
});

const errorMiddleware = (
  error: unknown, _req: Request, res: Response, next: NextFunction
) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.post('/', newPatientParser, (
  req: Request<unknown, unknown, NewPatient>, res: Response<Patient>
) => {
  const addedPatient = patientService.addPatient(req.body);
  console.log('someone added new patient:', addedPatient);
  res.json(addedPatient);
});

router.use(errorMiddleware);

export default router;
