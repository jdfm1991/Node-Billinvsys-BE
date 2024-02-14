import { z } from "zod";

export const userSchemaRegister = z.object({
    name:z.string({
        required_error: "Name Is Required "
    }).trim().min(1,{
        message: "Name Is Required "
    }),
    email:z.string({
        required_error:  "Email Is Required "
    }).email({
        message:  "Email Is Invalid "
    }),
    password: z.string({
        required_error:  "Password Is Required "
    }).min(6, {
        message:"Password must be at least 6 characters "
    }),
    image: z.string().optional() ,
    status:z.string().transform( (val) => z.boolean()),
    type : z.string({
        required_error: "User Type Is Required ",
    }).min(1,{
        message:"User Type Cannot Be Empty "
    } )
})