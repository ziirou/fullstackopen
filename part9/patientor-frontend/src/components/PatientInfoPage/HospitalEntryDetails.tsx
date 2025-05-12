import React from "react";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { HospitalEntry } from "../../types";

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <div>
      <span>{entry.date} </span>
      <LocalHospitalIcon />
      <p><em>{entry.description}</em></p>
      <p>Discharge: {entry.discharge.date} - <em>{entry.discharge.criteria}</em></p>
    </div>
  );
};

export default HospitalEntryDetails;
