"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppointmentDto = exports.AppointmentSchema = void 0;
const valibot_1 = require("valibot");
const isValidDateFormat = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value) && !isNaN(new Date(value).getTime());
exports.AppointmentSchema = (0, valibot_1.object)({
    date: (0, valibot_1.pipe)((0, valibot_1.string)('Date is required'), (0, valibot_1.nonEmpty)('Date cannot be empty'), (0, valibot_1.custom)((val) => isValidDateFormat(val), 'Date must be in YYYY-MM-DD format'), (0, valibot_1.transform)((val) => new Date(val))),
    reason: (0, valibot_1.pipe)((0, valibot_1.string)('reason is required'), (0, valibot_1.nonEmpty)('Reason cannot be empty')),
    petId: (0, valibot_1.pipe)((0, valibot_1.string)('petId is required'), (0, valibot_1.nonEmpty)('petId cannot be empty')),
    userId: (0, valibot_1.pipe)((0, valibot_1.string)('userId is required'), (0, valibot_1.nonEmpty)('userId cannot be empty')),
});
class CreateAppointmentDto {
    constructor(date, reason, petId, userId) {
        this.date = date;
        this.reason = reason;
        this.petId = petId;
        this.userId = userId;
    }
    static execute(input) {
        var _a, _b;
        const result = (0, valibot_1.safeParse)(exports.AppointmentSchema, input);
        if (!result.success) {
            const error = (_b = (_a = result.issues[0]) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : 'Validation Failed';
            return [error];
        }
        const { date, reason, petId, userId } = result.output;
        return [undefined, new CreateAppointmentDto(date, reason, petId, userId)];
    }
}
exports.CreateAppointmentDto = CreateAppointmentDto;
