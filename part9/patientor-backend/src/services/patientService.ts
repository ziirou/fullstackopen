import { v1 as uuid } from 'uuid';
import patients from '../../data/patientData';
import { Patient, NonSensitivePatient, NewPatient } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) =>
    ({ id, name, dateOfBirth, gender, occupation, })
  );
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, getNonSensitivePatients, addPatient };
