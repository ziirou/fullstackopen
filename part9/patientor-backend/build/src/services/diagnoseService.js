"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diagnoseData_1 = __importDefault(require("../../data/diagnoseData"));
const getDiagnoses = () => {
    return diagnoseData_1.default;
};
exports.default = { getDiagnoses };
