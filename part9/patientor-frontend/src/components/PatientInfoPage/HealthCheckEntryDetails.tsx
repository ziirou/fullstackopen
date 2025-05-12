import React from "react";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from "@mui/icons-material/Favorite";
import { HealthCheckEntry } from "../../types";

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const healthCheckRatingColor = (rating: number) => {
    switch (rating) {
      case 0:
        return "green";
      case 1:
        return "yellow";
      case 2:
        return "orange";
      case 3:
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <div>
      <span>{entry.date} </span>
      <MedicalServicesIcon />
      <p><em>{entry.description}</em></p>
      <FavoriteIcon style={{ color: healthCheckRatingColor(entry.healthCheckRating) }} />
    </div>
  );
};

export default HealthCheckEntryDetails;
