import { seedDatabase } from '../src/lib/sample/seed-data';

async function main() {
  await seedDatabase();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
 
  });