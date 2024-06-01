import { object, string, number, date, InferType } from "yup";

export const registerSchema = object({
  name: string().required(),
  email: string().required().email(),
  password: string().required().min(5),
});
