// src/User.ts
import { PrismaClient } from "@prisma/client"; // Adjust the import path as necessary
const prisma = new PrismaClient();

export async function createUser(userData: { name: string; email: string }) {
    return await prisma.utilisateur.create({
        data: { nom: 'John Doe', type: 'barman' }
    });
}

export async function getUserById(userId: number) {
    return await prisma.utilisateur.findUnique({
        where: { id: userId },
    });
}

export async function updateUser(userId: number, userData: { name?: string; email?: string }) {
    return await prisma.utilisateur.update({
        where: { id: userId },
        data: userData,
    });
}

export async function deleteUser(userId: number) {
    return await prisma.utilisateur.delete({
        where: { id: userId },
    });
}