import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { prisma } from './db.js';

async function main() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    console.error('[seed] ADMIN_USERNAME and ADMIN_PASSWORD must be set');
    process.exit(1);
  }

  const existing = await prisma.adminUser.findUnique({ where: { username } });
  const passwordHash = await bcrypt.hash(password, 12);

  if (existing) {
    await prisma.adminUser.update({
      where: { username },
      data: { passwordHash },
    });
    console.log(`[seed] Updated admin password for "${username}"`);
  } else {
    await prisma.adminUser.create({
      data: { username, passwordHash },
    });
    console.log(`[seed] Created admin "${username}"`);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
