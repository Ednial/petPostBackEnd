"use strict";
/*export class CreatePetDto {
  constructor(
    public readonly name: string,
    public readonly breed: string,
    public readonly weight: number
  ) {}

  static execute(object: { [key: string]: any }): [string?, CreatePetDto?] {
    const { name, breed, weight } = object;

    if (!name) return ['name is required!'];
    if (!breed) return ['breed is required'];
    if (!weight) return ['weight is required'];

    return [undefined, new CreatePetDto(name, breed, weight)];
  }
}*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePetDto = exports.CreatePetSechema = void 0;
const valibot_1 = require("valibot");
exports.CreatePetSechema = (0, valibot_1.object)({
    name: (0, valibot_1.pipe)((0, valibot_1.string)('name is required'), (0, valibot_1.minLength)(3, 'name must be a least 3 characters long'), (0, valibot_1.maxLength)(30, 'name must be a most 30 characters long')),
    breed: (0, valibot_1.pipe)((0, valibot_1.string)('breed is required'), (0, valibot_1.minLength)(3, 'breed must be a least 3 characters long'), (0, valibot_1.maxLength)(30, 'breed must be a most 30 characters long')),
    weight: (0, valibot_1.pipe)((0, valibot_1.number)('weight is required'), (0, valibot_1.minValue)(0.1, 'weight must be a positive number'), (0, valibot_1.maxValue)(200, 'weight must be a most 200')),
    userId: (0, valibot_1.pipe)((0, valibot_1.string)('userId is required')),
});
class CreatePetDto {
    constructor(name, breed, weight, userId) {
        this.name = name;
        this.breed = breed;
        this.weight = weight;
        this.userId = userId;
    }
    static execute(input) {
        var _a, _b;
        const result = (0, valibot_1.safeParse)(exports.CreatePetSechema, input);
        if (!result.success) {
            const error = (_b = (_a = result.issues[0]) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : 'Validation failed';
            return [error];
        }
        const { name, breed, weight, userId } = result.output;
        return [undefined, new CreatePetDto(name, breed, weight, userId)];
    }
}
exports.CreatePetDto = CreatePetDto;
/*import z from "zod";

const createRepairSchema = z.object({
  date: z
    .string({ message: "date is required" })
    .regex(/^\d{2}-\d{2}-\d{4}$/, {
      message: "Date must be in format MM-DD-YYYY",
    })
    .refine(
      (date) => {
        const [month, day, year] = date.split("-").map(Number);
        const parsedDate = new Date(year, month - 1, day);
        return (
          parsedDate.getMonth() === month - 1 &&
          parsedDate.getDate() === day &&
          parsedDate.getFullYear() === year
        );
      },
      { message: "Invalid date" }
    ),
  motorsNumber: z.string().min(5, { message: "motorsNumber is required" }),
  description: z.string().min(10, { message: "description is required" }),
  userId: z.string().uuid({ message: "userId is required" }),
});

export class CreateRepairDTO {
  constructor(
    public date: Date,
    public userId: string,
    public motorsNumber: string,
    public description: string
  ) {}

  static create(object: {
    [key: string]: any;
  }): [Record<string, string>?, CreateRepairDTO?] {
    const { date, userId, motorsNumber, description } = object;

    const result = createRepairSchema.safeParse(object);

    if (!result.success) {
      const errorMessages = result.error.errors.reduce((acc: any, err: any) => {
        const field = err.path.join(".");
        acc[field] = err.message;
        return acc;
      }, {} as Record<string, string>);

      return [errorMessages];
    }

    return [
      undefined,
      new CreateRepairDTO(date, userId, motorsNumber, description),
    ];
  }
}
*/
