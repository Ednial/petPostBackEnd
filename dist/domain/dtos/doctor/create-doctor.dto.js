"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDoctorDto = exports.DoctorSchema = void 0;
const valibot_1 = require("valibot");
exports.DoctorSchema = (0, valibot_1.object)({
    fullname: (0, valibot_1.pipe)((0, valibot_1.string)('fullname is required'), (0, valibot_1.minLength)(3, 'fullname must be a least 3 characters long'), (0, valibot_1.maxLength)(70, 'fullname must be a most 30 characters long')),
    email: (0, valibot_1.pipe)((0, valibot_1.string)(), (0, valibot_1.nonEmpty)('Please enter your email.'), (0, valibot_1.email)('The email address is badly formatted.')),
});
class CreateDoctorDto {
    constructor(fullname, email) {
        this.fullname = fullname;
        this.email = email;
    }
    static execute(input) {
        var _a, _b;
        const result = (0, valibot_1.safeParse)(exports.DoctorSchema, input);
        if (!result.success) {
            const error = (_b = (_a = result.issues[0]) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : 'Validation failed';
            return [error];
        }
        const { fullname, email } = result.output;
        return [undefined, new CreateDoctorDto(fullname, email)];
    }
}
exports.CreateDoctorDto = CreateDoctorDto;
