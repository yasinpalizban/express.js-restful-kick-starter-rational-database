const callSeeder = (async () => {
  //  npm run seeder --seed=../../common/seeds/file.seeder.ts
  let path = process.env.npm_config_seed;

  if (!path) {
    console.log('seed path is empty');
    console.log('follow this structure to work correctly');
    console.log('npm run seeder --seed=../../common/seeds/file.seeder.ts');
    process.exit();
  }

  const dropDotTs = path.search('.ts');
  if (dropDotTs !== -1) {
    path = path.substr(0, dropDotTs).trim();
  }

  const file = await import(path);
  const myClass = new file.default();
  console.log('Start seeding : ' + process.env.npm_config_seed + '  \n');
  await myClass.run();
})()
  .then(() => {
    console.log('Finish seeding ');
    process.exit();
  })
  .catch(error => {
    console.log('Ops seeding error : \n ');
    console.error(error);
  });
