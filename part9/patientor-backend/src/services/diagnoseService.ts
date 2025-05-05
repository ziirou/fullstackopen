import diagnoses from '../../data/diagnoseData';
import { Diagnosis } from '../types';

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

export default { getDiagnoses };
