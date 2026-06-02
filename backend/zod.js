import z from "zod"

 export const createUser=z.object({
    name:z.string().min(2).max(30),
    email:z.string().email(),
    password:z.string().min(6)
})