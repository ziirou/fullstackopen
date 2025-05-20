import { useState, SyntheticEvent } from "react";

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material';

import { Diagnosis, EntryFormValues, EntryType, HealthCheckRating } from "../../types";

interface Props {
  diagnoses: Diagnosis[]
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

interface TypeOption {
  value: EntryType;
  label: string;
}

const typeOptions: TypeOption[] = Object.values(EntryType).map(v => ({
  value: v, label: v.toString()
}));

interface HealthCheckRatingOption {
  value: HealthCheckRating;
  label: string;
}

const ratingOptions: HealthCheckRatingOption[] = Object.values(HealthCheckRating)
  .filter((v) => typeof v === "number")
  .map((v) => ({
    value: v as HealthCheckRating,
    label: `${v} - ${HealthCheckRating[v as HealthCheckRating]}`
  }));

const AddEntryForm = ({ diagnoses, onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [type, setType] = useState('');
  const [discharge, setDischarge] = useState({
    date: '',
    criteria: '',
  });
  const [employerName, setEmployerName] = useState('');
  const [sickLeave, setSickLeave] = useState({
    checked: false,
    startDate: '',
    endDate: '',
  });
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating | ''>('');

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    setType(event.target.value as EntryType);
  };
  
  const onRatingChange = (event: SelectChangeEvent<number | string>) => {
    const value = event.target.value;
    if (value === '') return;
    setHealthCheckRating(value as HealthCheckRating);
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const filteredDiagnosisCodes = diagnosisCodes.filter(code => code.trim() !== '');

    const baseObject = {
      description,
      date,
      specialist,
      diagnosisCodes: filteredDiagnosisCodes.length > 0 ? filteredDiagnosisCodes : undefined,
    };

    let entryObject: EntryFormValues | undefined;

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
          ...(sickLeave.checked
            ? {
                sickLeave: {
                  startDate: sickLeave.startDate,
                  endDate: sickLeave.endDate,
                }
              }
            : {}),
        };
        break;
      case EntryType.HealthCheck:
        entryObject = {
          ...baseObject,
          type: EntryType.HealthCheck,
          healthCheckRating: healthCheckRating as HealthCheckRating,
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
          sx={{ mb: 1 }}
          required
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />

        <FormControl fullWidth sx={{ my: 1 }}>
          <InputLabel id="diagnosis-codes-label">
            Diagnosis Codes
          </InputLabel>
          <Select
            labelId="diagnosis-codes-label"
            multiple
            value={diagnosisCodes}
            onChange={(event) => {
              const value = event.target.value;
              setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
            }}
            renderValue={(selected) => (selected as string[]).join(', ')}
          >
            {diagnoses.map((option) => (
              <MenuItem key={option.code} value={option.code}>
                <Checkbox checked={diagnosisCodes.includes(option.code)} />
                <ListItemText primary={option.code} secondary={option.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Specialist"
          fullWidth
          sx={{ my: 1 }}
          required
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <FormControl sx={{ my: 1 }}>
          <InputLabel required shrink htmlFor="date-input">
            Date
          </InputLabel>
          <OutlinedInput
            id="date-input"
            type="date"
            required
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </FormControl>

        <FormControl fullWidth sx={{ my: 1 }}>
          <InputLabel required id="type-label">
            Type
          </InputLabel>
          <Select
            labelId="type-label"
            required
            value={type}
            onChange={onTypeChange}
          >
            {typeOptions.map(option =>
              <MenuItem key={option.label} value={option.value}>
                {option.label}
              </MenuItem>
            )}
          </Select>
        </FormControl>

        {(() => {
          switch (type) {
            case EntryType.Hospital:
              return (
                <>
                  <FormControl sx={{ my: 1 }}>
                    <InputLabel required shrink htmlFor="discharge-date-input">
                      Discharge Date
                    </InputLabel>
                    <OutlinedInput
                      id="discharge-date-input"
                      type="date"
                      required
                      value={discharge.date}
                      onChange={({ target }) => setDischarge({ ...discharge, date: target.value })}
                    />
                  </FormControl>

                  <TextField
                    label="Discharge Criteria"
                    fullWidth
                    sx={{ my: 1 }}
                    required
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
                    sx={{ my: 1 }}
                    required
                    value={employerName}
                    onChange={({ target }) => setEmployerName(target.value)}
                  />

                  <FormGroup>
                    <FormControlLabel
                      label="Sick Leave"
                      control={
                        <Checkbox
                          checked={sickLeave.checked}
                          onChange={({ target }) => setSickLeave({ ...sickLeave, checked: target.checked })}
                        />
                      }
                    />
                    {sickLeave.checked && (
                      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3, alignSelf: 'flex-start' }}>
                        <FormControl sx={{ my: 1 }}>
                          <InputLabel required shrink htmlFor="sickleave-start-input">
                            Start Date
                          </InputLabel>
                          <OutlinedInput
                            id="sickleave-start-input"
                            type="date"
                            required
                            value={sickLeave.startDate}
                            inputProps={{ max: sickLeave.endDate || undefined }}
                            onChange={({ target }) => setSickLeave({ ...sickLeave, startDate: target.value })}
                          />
                        </FormControl>
                        <FormControl sx={{ my: 1 }}>
                          <InputLabel required shrink htmlFor="sickleave-end-input">
                            End Date
                          </InputLabel>
                          <OutlinedInput
                            id="sickleave-end-input"
                            type="date"
                            required
                            value={sickLeave.endDate}
                            inputProps={{ min: sickLeave.startDate || undefined }}
                            onChange={({ target }) => setSickLeave({ ...sickLeave, endDate: target.value })}
                          />
                        </FormControl>
                      </Box>
                    )}
                  </FormGroup>
                </>
              );
            case EntryType.HealthCheck:
              return (
                <>
                  <FormControl fullWidth sx={{ my: 1 }}>
                    <InputLabel required id="rating-label">
                      Health Check Rating
                    </InputLabel>
                    <Select
                      labelId="rating-label"
                      value={healthCheckRating}
                      required
                      onChange={onRatingChange}
                    >
                      {ratingOptions.map(option =>
                        <MenuItem key={option.label} value={option.value}>
                          {option.label}
                        </MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </>
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
              style={{ float: "right" }}
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
