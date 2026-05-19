const prisma = require("./client");
const bcrypt = require("bcryptjs");

async function main() {

  const password = await bcrypt.hash("admin123", 10);

  const company = await prisma.company.create({
    data: {
      name: "Empresa Demo",
      slug: "empresa-demo",
      email: "demo@gmail.com"
    }
  });

  const user = await prisma.user.create({
    data: {
      name: "Administrador",
      email: "admin@gmail.com",
      password,
      slug: "administrador",
      role: "ADMIN",
      companyId: company.id
    }
  });

  console.log(user);

}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });