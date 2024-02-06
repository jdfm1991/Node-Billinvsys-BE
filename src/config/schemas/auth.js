import { z } from "zod";
import { zfd } from "zod-form-data";


export const registerSchema = z.object({
    name:z.string({
        required_error: "Name Is Required"
    }),
    email:z.string({
        required_error:  "Email Is Required"
    }).email({
        message:  "Email Is Invalid"
    }),
    password: z.string({
        required_error:  "Password Is Required"
    }).min(6, {
        message:"Password must be at least 6 characters"
    })
})

export const loginSchema = z.object({
    email:z.string({
        required_error:  "Email Is Required"
    }).email("Email Is Invalid"),
    password: z.string({
        required_error:  "Password Is Required"
    }).min(6, "Password must be at least 6 characters")
  });
