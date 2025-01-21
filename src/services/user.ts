import { Prisma, Role } from "@prisma/client";
import { prisma } from "../libs/prisma";

type CreateUserProps = {
    name:string;
    email:string;
};

export const createUser = async (data:Prisma.UserCreateInput) => {
    // try {
    //     return await prisma.user.create({data});
    // }
    // catch(erro) {
    //     return false
    // }

    const result = await prisma.user.upsert({
        where: {
            email: data.email
        },
        update: {
            role:'ADMIN'
        },
        create: data
    })

    return result;
}

export const createUsers = async (users: Prisma.UserCreateInput[]) => {
    try {
        return await prisma.user.createMany({
            data: users,
            skipDuplicates: true
        })
    }
    catch(error) {
        return false
    }
}

export const getAllUser = async () => {
    let page = 2;
    const users = await prisma.user.findMany({
        orderBy: {
            id:'asc'
        },
        // skip:(page - 1) * 2,
        // take:2
    });
    return users;
}

export const getUserByEmail = async (email:string) => {
    const user = await prisma.user.findUnique({
        where: {
            email:'joao@gmail.com',
        },
        select:{
            id:true,
            name:true,
            email:true
        }
    })

    return user;
}

export const updateUser = async () => {
    // const updatedUser = await prisma.user.update({
    //     where: {
    //         email:'suporte@b7web.com.br'
    //     },
    //     data: {
    //         role: 'ADMIN'
    //     }
    // })

    const updatedUser = await prisma.user.updateMany({
        where: {
            email: {
                endsWith:'@hotmail.com'
            }
        },
        data: {
            status:false
        }
    })
    return updatedUser
}

export const deleteUser = async () => {
    const deletedUser = await prisma.user.delete({
        where: {
            email: "teste3@b7web.com"
        }
    })

    return deletedUser;
}