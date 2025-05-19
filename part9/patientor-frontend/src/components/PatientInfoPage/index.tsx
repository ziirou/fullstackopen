import { useState, useEffect } from "react";
import { useMatch } from "react-router-dom";
import axios from 'axios';
import { Typography, CircularProgress, Button } from "@mui/material";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

import { Patient, Gender, Entry, Diagnosis, EntryFormValues } from "../../types";
import AddEntryModal from "../AddEntryModal";

import patientService from "../../services/patients";

import EntryDetails from "./EntryDetails";

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
  diagnoses: Diagnosis[];
}

const PatientInfoPage = ({ diagnoses } : Props ) => {
  const [patient, setPatient] = useState<Patient>();
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

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

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const entry = await patientService.createEntry(patient.id, values);
      setPatient({
        ...patient,
        entries: patient.entries.concat(entry)
      });
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data?.error[0]) {
          let errorMessage = "";
          if (e?.response?.data?.error[0].path[0] && typeof e?.response?.data?.error[0].path[0] === "string") {
            errorMessage = e.response.data.error[0].path[0];
          }
          if (e?.response?.data?.error[0].message && typeof e?.response?.data?.error[0].message === "string") {
            errorMessage = errorMessage + ": " + e.response.data.error[0].message;
          }
          console.error(errorMessage);
          setError(errorMessage);
        } else {
          console.error("Unrecognized axios error", e);
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
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
            <EntryDetails entry={entry} diagnoses={diagnoses} />
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

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientInfoPage;
