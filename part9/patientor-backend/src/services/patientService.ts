import { v1 as uuid } from 'uuid';
import patients from '../../data/patientData';
import { Patient, NonSensitivePatient, NewPatient, Entry, EntryWithoutId } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) =>
    ({ id, name, dateOfBirth, gender, occupation, })
  );
};

const findPatientById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
    entries: patient.entries as Entry[],
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patient: Patient, entry: EntryWithoutId): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };

  patient.entries.push(newEntry);
  return newEntry;
};

export default { getPatients, getNonSensitivePatients, findPatientById, addPatient, addEntry };
