import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const userController = {
    async getAllUsers(req, res) {
        try {
            const users = await prisma.users.findMany();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error });
        } finally {
            prisma.$disconnect();
        }
    },

    async getOneUserById(req, res) {
        const id = parseInt(req.params.user_id);
        try {
            const user = await prisma.users.findUnique({
                where: {
                    user_id: id,
                },
                include: {
                    comments: true,
                    topics: true,
                    courses: true,
                    watches: true,
                },
            });
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur", error });
        } finally {
            prisma.$disconnect();
        }
    },

    async getAllTeachers(req, res) {
        try {
            const teachers = await prisma.users.findMany({
                where: {
                    role_name: 'Professeur',
                },
            });

            if (!teachers) {
                return res.status(404).json({ message: 'Aucun enseignant trouvé' });
            }
            res.status(200).json(teachers);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la récupération des enseignants', error });
        } finally {
            prisma.$disconnect();
        }
    },

    async createUser(req, res) {
        const { nickname, mail, password, first_name, last_name, role_name } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const foundNickname = await prisma.users.findUnique({ where: { nickname } });
            const foundMail = await prisma.users.findUnique({ where: { mail } });

            // #1 ECHEC: si un utilisateur est créé avec un email déjà existant en bdd
            if (foundNickname) {
                return res.status(409).json({ message: 'NICKNAME_NOT_AVAILABLE' });
            }
            // #2 ECHEC: si un utilisateur est créé avec un nickname déjà existant en bdd
            if (foundMail) {
                return res.status(409).json({ message: 'MAIL_ALREADY_EXIST' });
            }

            const user = await prisma.users.create({
                data: {
                    nickname,
                    mail,
                    password: hashedPassword,
                    first_name,
                    last_name,
                    role_name,
                },
            });
            console.log("User created successfully:", user);

            res.status(201).json(user);
        } catch (error) {
            console.log("Error occurred:", error); 
            res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
        } finally {
            prisma.$disconnect();
        }
    },

    async updateUser(req, res) {
        const id = parseInt(req.params.user_id);
        const { nickname, mail, password, first_name, last_name, role_name } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const foundNickname = await prisma.users.findUnique({ where: { nickname } });
            const foundMail = await prisma.users.findUnique({ where: { mail } });

            // #1 ECHEC: si un utilisateur est créé avec un email déjà existant en bdd
            if (foundNickname) {
                return res.status(409).json({ message: 'NICKNAME_NOT_AVAILABLE' });
            }
            // #2 ECHEC: si un utilisateur est créé avec un nickname déjà existant en bdd
            if (foundMail) {
                return res.status(409).json({ message: 'MAIL_ALREADY_EXIST' });
            }
            const user = await prisma.users.update({
                where: {
                    user_id: id,
                },

                data: {
                    nickname,
                    mail,
                    password: hashedPassword,
                    first_name,
                    last_name,
                    role_name,
                },
            });

            res.status(200).json(user);
        } catch (error) {
            console.log("Error occurred:", error); 
            res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
        } finally {
            prisma.$disconnect();
        }
    },

    // Controller pour supprimer un profil
    async deleteUser(req, res) {
        const userId = parseInt(req.params.user_id);

        try {
            const user = await prisma.users.delete({
                where: {
                    user_id: userId,
                },
            });

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppresion de l'utilisateur", error });
        } finally {
            prisma.$disconnect();
        }
    },
};

export { userController };
