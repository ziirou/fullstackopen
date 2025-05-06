/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log('someone fetched patients');
  res.send(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const addedPatient = patientService.addPatient({
    name, dateOfBirth, ssn, gender, occupation,
  });
  console.log('someone added new patient:', addedPatient);
  res.json(addedPatient);
});

export default router;
