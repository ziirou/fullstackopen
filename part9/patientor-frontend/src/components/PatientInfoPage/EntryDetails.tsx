import React from "react";
import { Diagnosis, Entry } from "../../types";
import HospitalEntryDetails from "./HospitalEntryDetails";
import OccupationalHealthcareEntryDetails from "./OccupationalHealthcareEntryDetails";
import HealthCheckEntryDetails from "./HealthCheckEntryDetails";

const EntryDetails: React.FC<{ entry: Entry, diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {

  const renderDiagnoses = (diagnosisCodes: string[] | undefined) => {
    if (!diagnosisCodes || diagnosisCodes.length === 0) {
      return null;
    }

    return (
      <div style={{ border: "1px black solid" , padding: "5px 0px 0px 5px", marginBottom: "10px" }}>
        <span>Diagnose codes:</span>
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
      </div>
    );
  };

  return (
    <div style={{ border: "1px black solid" , padding: "10px", marginBottom: "10px" }}>
      {(() => {
        switch (entry.type) {
          case "Hospital":
            return <HospitalEntryDetails entry={entry} />;
          case "OccupationalHealthcare":
            return <OccupationalHealthcareEntryDetails entry={entry} />;
          case "HealthCheck":
            return <HealthCheckEntryDetails entry={entry} />;
          default:
            throw new Error(`Unhandled entry type: ${JSON.stringify(entry)}`);
        }
      })()}

      {renderDiagnoses(entry.diagnosisCodes)}

      <span>diagnosed by {entry.specialist}</span>
    </div>
  );
};

export default EntryDetails;
