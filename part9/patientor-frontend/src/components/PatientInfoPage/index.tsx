import { useState, useEffect } from "react";
import { useMatch } from "react-router-dom";
import { Typography, CircularProgress } from "@mui/material";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

import { Patient, Gender, Entry, Diagnosis } from "../../types";

import patientService from "../../services/patients";

const genderIcon = (gender: Gender | undefined ) => {
  switch(gender) {
    case "female":
      return <FemaleIcon />;
    case "male":
      return <MaleIcon />;
    default:
      return null;
  }
};

interface Props {
  diagnoses : Diagnosis[]
}

const PatientInfoPage = ({ diagnoses } : Props ) => {
  const [patient, setPatient] = useState<Patient>();
  const [loading, setLoading] = useState(true);

  const patientMatch = useMatch('/patients/:id');

  useEffect(() => {
    const fetchPatient = async () => {
      if (!patientMatch || !patientMatch.params.id) {
        setLoading(false);
        return;
      }

      try {
        const patient = await patientService.getOne(patientMatch.params.id);
        setPatient(patient);
      } catch (e: unknown) {
        console.log(e as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [patientMatch]);

  if (loading) {
    return (
      <div>
        <Typography variant="h5" color="textSecondary" marginTop={2}>
          Loading patient information...
        </Typography>
        <CircularProgress />
      </div>
    );
  }

  if (!patient || !patientMatch) {
    return (
      <div>
        <Typography variant="h5" color="error" marginTop={2}>
          Patient not found
        </Typography>
      </div>
    );
  }

  const renderDiagnoses = (diagnosisCodes: string[] | undefined) => {
    if (!diagnosisCodes || diagnosisCodes.length === 0) {
      return null;
    }

    return (
      <ul>
        {diagnosisCodes.map((code: string) => {
          const diagnosis = diagnoses.find((d) => d.code === code);
          return (
            <li key={code}>
              {code} {diagnosis ? `- ${diagnosis.name}` : ""}
            </li>
          );
        })}
      </ul>
    );
  };

  const renderEntries = () => {
    if (!patient.entries || patient.entries.length === 0) {
      return null;
    }

    return (
      <>
        <Typography variant="h6" gutterBottom={true} marginTop={2}>
          <b>entries</b>
        </Typography>
        {Object.values(patient.entries).map((entry: Entry) => (
          <div key={entry.id}>
            {entry.date} - <em>{entry.description}</em>
            {renderDiagnoses(entry.diagnosisCodes)}
          </div>
        ))}
      </>
    );
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom={true} marginTop={2}>
        <b>{patient?.name}</b>{genderIcon(patient?.gender)}
      </Typography>
      <span>ssn: {patient?.ssn}</span><br />
      <span>occupation: {patient?.occupation}</span>

      {renderEntries()}
    </div>
  );
};

export default PatientInfoPage;
