import z from "zod"

 export const createUser=z.object({
    name:z.string().min(2).max(30),
    email:z.string().email(),
    password:z.string().min(6)
})

export const housrHold=z.object({
    name:z.string().min(3).max(30),
   
})