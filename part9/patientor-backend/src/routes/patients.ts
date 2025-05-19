import express, { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import patientService from '../services/patientService';
import { NewEntrySchema, NewPatientSchema } from '../utils';
import { Patient, NewPatient, Entry, EntryWithoutId } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log('someone fetched patients');
  res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  console.log('someone fetched patient with id:', req.params.id);
  const patient = patientService.findPatientById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
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

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.post('/:id/entries', newEntryParser, (
  req: Request<{ id: string }, unknown, EntryWithoutId>, res: Response<Entry>
) => {
  const patientId = req.params.id;
  console.log('someone adding entry for id:', patientId);

  const patient = patientService.findPatientById(patientId);
  if (!patient) {
    res.sendStatus(404);
  } else {
    const addedEntry = patientService.addEntry(patient, req.body);
    console.log('someone added new entry:', addedEntry);
    res.json(addedEntry);
  }
});

router.use(errorMiddleware);

export default router;
