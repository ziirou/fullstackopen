"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patientData_1 = __importDefault(require("../../data/patientData"));
const getPatients = () => {
    return patientData_1.default;
};
const getNonSensitivePatients = () => {
    return patientData_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation, }));
};
const findPatientById = (id) => {
    return patientData_1.default.find(p => p.id === id);
};
const addPatient = (patient) => {
    const newPatient = Object.assign(Object.assign({ id: (0, uuid_1.v1)() }, patient), { entries: patient.entries });
    patientData_1.default.push(newPatient);
    return newPatient;
};
const addEntry = (patient, entry) => {
    const newEntry = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    patient.entries.push(newEntry);
    return newEntry;
};
exports.default = { getPatients, getNonSensitivePatients, findPatientById, addPatient, addEntry };
