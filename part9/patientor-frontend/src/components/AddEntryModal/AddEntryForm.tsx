import { useState, SyntheticEvent } from "react";

import { TextField, Grid, Button } from '@mui/material';

import { EntryFormValues, EntryType } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState(['']);
  const [type, setType] = useState('');
  const [discharge, setDischarge] = useState({
    date: '',
    criteria: '',
  });
  const [employerName, setEmployerName] = useState('');
  const [sickLeave, setSickLeave] = useState({
    startDate: '',
    endDate: '',
  });
  const [healthCheckRating, setHealthCheckRating] = useState('');

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    let entryObject: EntryFormValues | undefined;

    const baseObject = {
      description,
      date,
      specialist,
      diagnosisCodes,
    };

    switch (type) {
      case EntryType.Hospital:
        entryObject = {
          ...baseObject,
          type: EntryType.Hospital,
          discharge: {
            date: discharge.date,
            criteria: discharge.criteria,
          },
        };
        break;
      case EntryType.OccupationalHealthcare:
        entryObject = {
          ...baseObject,
          type: EntryType.OccupationalHealthcare,
          employerName,
          sickLeave: {
            startDate: sickLeave.startDate,
            endDate: sickLeave.endDate,
          },
        };
        break;
      case EntryType.HealthCheck:
        entryObject = {
          ...baseObject,
          type: EntryType.HealthCheck,
          healthCheckRating: Number(healthCheckRating),
        };
        break;
      default:
        console.log(`Unhandled entry type: ${JSON.stringify(type)}`);
        return onSubmit(baseObject as EntryFormValues);
    }

    onSubmit(entryObject as EntryFormValues);
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Diagnosis Codes"
          fullWidth
          value={diagnosisCodes.join(', ')}
          onChange={({ target }) => setDiagnosisCodes(target.value.split(',').map(code => code.trim()))}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Type"
          fullWidth
          value={type}
          onChange={({ target }) => setType(target.value)}
        />

        {(() => {
          switch (type) {
            case EntryType.Hospital:
              return (
                <>
                  <TextField
                    label="Discharge Date"
                    fullWidth
                    value={discharge.date}
                    onChange={({ target }) => setDischarge({ ...discharge, date: target.value })}
                  />
                  <TextField
                    label="Discharge Criteria"
                    fullWidth
                    value={discharge.criteria}
                    onChange={({ target }) => setDischarge({ ...discharge, criteria: target.value })}
                  />
                </>
              );
            case EntryType.OccupationalHealthcare:
              return (
                <>
                  <TextField
                    label="Employer Name"
                    fullWidth
                    value={employerName}
                    onChange={({ target }) => setEmployerName(target.value)}
                  />
                  <TextField
                    label="Sick Leave Start Date"
                    placeholder="YYYY-MM-DD"
                    fullWidth
                    value={sickLeave.startDate}
                    onChange={({ target }) => setSickLeave({ ...sickLeave, startDate: target.value })}
                  />
                  <TextField
                    label="Sick Leave End Date"
                    placeholder="YYYY-MM-DD"
                    fullWidth
                    value={sickLeave.endDate}
                    onChange={({ target }) => setSickLeave({ ...sickLeave, endDate: target.value })}
                  />
                </>
              );
            case EntryType.HealthCheck:
              return (
                <TextField
                  label="Health Check Rating"
                  fullWidth
                  value={healthCheckRating}
                  onChange={({ target }) => setHealthCheckRating(target.value)}
                />
              );
            default:
              return null;
          }
        })()}

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
