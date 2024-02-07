import { z } from "zod";

export const fileSchemaRegister = z.object({
    filename: z.string({
        required_error: "Filename Is Required"
    }).trim().min(1,{
        message: "Filename Is Required"
    }),
    file: z.instanceof(File).optional(),
    user: z.string({
        required_error:  "User Is Required"
    }),
    status: z.boolean().optional(),
     

})