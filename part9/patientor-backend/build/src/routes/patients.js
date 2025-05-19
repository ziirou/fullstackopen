"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    console.log('someone fetched patients');
    res.send(patientService_1.default.getNonSensitivePatients());
});
router.get('/:id', (req, res) => {
    console.log('someone fetched patient with id:', req.params.id);
    const patient = patientService_1.default.findPatientById(req.params.id);
    if (patient) {
        res.send(patient);
    }
    else {
        res.sendStatus(404);
    }
});
const errorMiddleware = (error, _req, res, next) => {
    if (error instanceof zod_1.z.ZodError) {
        res.status(400).send({ error: error.issues });
    }
    else {
        next(error);
    }
};
const newPatientParser = (req, _res, next) => {
    try {
        utils_1.NewPatientSchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
router.post('/', newPatientParser, (req, res) => {
    const addedPatient = patientService_1.default.addPatient(req.body);
    console.log('someone added new patient:', addedPatient);
    res.json(addedPatient);
});
const newEntryParser = (req, _res, next) => {
    try {
        utils_1.NewEntrySchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
router.post('/:id/entries', newEntryParser, (req, res) => {
    const patientId = req.params.id;
    console.log('someone adding entry for id:', patientId);
    const patient = patientService_1.default.findPatientById(patientId);
    if (!patient) {
        res.sendStatus(404);
    }
    else {
        const addedEntry = patientService_1.default.addEntry(patient, req.body);
        console.log('someone added new entry:', addedEntry);
        res.json(addedEntry);
    }
});
router.use(errorMiddleware);
exports.default = router;
