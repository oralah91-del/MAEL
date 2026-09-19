import { hashPassword, verifyPassword } from "./auth";

const password = "CorrectHorseBatteryStaple!2026";
const stored = hashPassword(password);
if (!verifyPassword(password, stored)) throw new Error("password verification failed");
if (verifyPassword("wrong-password", stored)) throw new Error("invalid password accepted");
console.log("auth crypto checks passed");
