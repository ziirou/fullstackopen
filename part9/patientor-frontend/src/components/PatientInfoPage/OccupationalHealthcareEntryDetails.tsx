import React from "react";
import WorkIcon from '@mui/icons-material/Work';
import { OccupationalHealthcareEntry } from "../../types";

const OccupationalHealthcareEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  return (
    <div>
      <span>{entry.date} </span>
      <WorkIcon />
      <span><em> {entry.employerName}</em></span>
      <p><em>{entry.description}</em></p>
      {entry.sickLeave && (
        <p>Sick Leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p>
      )}
    </div>
  );
};

export default OccupationalHealthcareEntryDetails;
