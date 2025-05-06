"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    console.log('someone fetched patients');
    res.send(patientService_1.default.getNonSensitivePatients());
});
router.post('/', (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const addedPatient = patientService_1.default.addPatient({
        name, dateOfBirth, ssn, gender, occupation,
    });
    console.log('someone added new patient:', addedPatient);
    res.json(addedPatient);
});
exports.default = router;
