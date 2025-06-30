const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const main = async () => {
    // const demoUsers = [
    //     { name: "Juan Perez", email: "juan.perez@example.com" },
    //     { name: "Maria Lopez", email: "maria.lopez@example.com" },
    //     { name: "Carlos Garcia", email: "carlos.garcia@example.com" },
    // ];

    // for (const user of demoUsers) {
    //     await prisma.user.create({
    //         data: user,
    //     });
    // }

    // console.log("Usuarios de demostración creados con éxito");

    await prisma.user.deleteMany();
};

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
