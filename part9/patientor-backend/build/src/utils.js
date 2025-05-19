"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewPatientSchema = exports.NewEntrySchema = void 0;
const zod_1 = require("zod");
const types_1 = require("./types");
const BaseEntrySchema = zod_1.z.object({
    id: zod_1.z.string(),
    type: zod_1.z.nativeEnum(types_1.EntryType),
    description: zod_1.z.string(),
    date: zod_1.z.string().date(),
    specialist: zod_1.z.string(),
    diagnosisCodes: zod_1.z.array(zod_1.z.string()).optional(),
});
const HospitalEntrySchema = BaseEntrySchema.extend({
    type: zod_1.z.literal(types_1.EntryType.Hospital),
    discharge: zod_1.z.object({
        date: zod_1.z.string().date(),
        criteria: zod_1.z.string(),
    }),
});
const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
    type: zod_1.z.literal(types_1.EntryType.OccupationalHealthcare),
    employerName: zod_1.z.string(),
    sickLeave: zod_1.z.object({
        startDate: zod_1.z.string().date(),
        endDate: zod_1.z.string().date(),
    }).optional(),
});
const HealthCheckEntrySchema = BaseEntrySchema.extend({
    type: zod_1.z.literal(types_1.EntryType.HealthCheck),
    healthCheckRating: zod_1.z.nativeEnum(types_1.HealthCheckRating),
});
const ExistingEntrySchema = zod_1.z.discriminatedUnion('type', [
    HospitalEntrySchema,
    OccupationalHealthcareEntrySchema,
    HealthCheckEntrySchema,
]);
exports.NewEntrySchema = zod_1.z.discriminatedUnion('type', [
    HospitalEntrySchema.omit({ id: true }),
    OccupationalHealthcareEntrySchema.omit({ id: true }),
    HealthCheckEntrySchema.omit({ id: true }),
]);
exports.NewPatientSchema = zod_1.z.object({
    name: zod_1.z.string(),
    dateOfBirth: zod_1.z.string().date(),
    ssn: zod_1.z.string(),
    gender: zod_1.z.nativeEnum(types_1.Gender),
    occupation: zod_1.z.string(),
    entries: zod_1.z.array(ExistingEntrySchema),
});
