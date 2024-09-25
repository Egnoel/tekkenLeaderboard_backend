const mongoose = require('mongoose');
const Character = require('./schema/characterSchema'); // Ajuste o caminho para o seu arquivo do modelo

const characters = [
  {
    name: 'Jin Kazama',
    image: 'https://media.graphassets.com/CSlAd5qETdKPCZ06jH88',
  },
  {
    name: 'Kazuya Mishima',
    image: 'https://media.graphassets.com/XeLA1vLjRWyGGsIGBVcG',
  },
  { name: 'King', image: 'https://media.graphassets.com/ESDBWWFCTiWikbaNUkLm' },
  {
    name: 'Jun Kazama',
    image: 'https://media.graphassets.com/HYPu2zYzRLerS3eqfTwF',
  },
  { name: 'Paul', image: 'https://media.graphassets.com/Wys7Ej5R1qxZqLC63aDw' },
  {
    name: 'Marshall Law',
    image: 'https://media.graphassets.com/BqxsOMlvRseUr3F7aO2G',
  },
  {
    name: 'Jack-8',
    image: 'https://media.graphassets.com/jfM0neQn21GVVdADnSng',
  },
  {
    name: 'Lars Alexandersson',
    image: 'https://media.graphassets.com/gOpaL3oEQ0CcGoqVX3fq',
  },
  {
    name: 'Ling Xiaoyu',
    image: 'https://media.graphassets.com/UNKaCD1mROSCvQZH9u7Y',
  },
  {
    name: 'Nina Williams',
    image: 'https://media.graphassets.com/gVUzqrySQYOpFLuEhdtu',
  },
  {
    name: 'Leroy',
    image: 'https://media.graphassets.com/FC92gE6ITFK8a2IDVwHE',
  },
  {
    name: 'Asuka Kazama',
    image: 'https://media.graphassets.com/yrZoIcLGSc6FzPkR9jhC',
  },
  { name: 'Lili', image: 'https://media.graphassets.com/pQi3O39ATPipjt8KqWgz' },
  {
    name: 'Bryan Fury',
    image: 'https://media.graphassets.com/TYE4FpfT8uX7VmQeTpjn',
  },
  {
    name: 'Hwoarang',
    image: 'https://media.graphassets.com/uvoZ2mARwGw4aqc66QIj',
  },
  {
    name: 'Claudio Serafino',
    image: 'https://media.graphassets.com/ribd0tVpSryycGRbwYkY',
  },
  {
    name: 'Azucena',
    image: 'https://media.graphassets.com/7UycvjwwQ52dahngE5Gt',
  },
  {
    name: 'Raven',
    image: 'https://media.graphassets.com/GfBegoCSS2Kr5gLZZgaf',
  },
  { name: 'Leo', image: 'https://media.graphassets.com/ALvLmqr5T3q7uDUbaabH' },
  {
    name: 'Steve Fox',
    image: 'https://media.graphassets.com/fCB8R5oyTZes3L12Gumi',
  },
  { name: 'Kuma', image: 'https://media.graphassets.com/mDNhdtnST0mZ2k9MZ8Bn' },
  {
    name: 'Yoshimitsu',
    image: 'https://media.graphassets.com/YN3pneoyR8iPWsasNEBG',
  },
  {
    name: 'Shaheen',
    image: 'https://media.graphassets.com/avCidy7zQXiMsJ1w6PGx',
  },
  {
    name: 'Dragunov',
    image: 'https://media.graphassets.com/NEGrObcRRFGsYTgruOkH',
  },
  { name: 'Feng', image: 'https://media.graphassets.com/uQtpkMVrTWhog956iF5w' },
  {
    name: 'Panda',
    image: 'https://media.graphassets.com/OkLv8YRNROyZRFItvMkZ',
  },
  { name: 'Lee', image: 'https://media.graphassets.com/ttclARTYRyxVIgFga2oR' },
  {
    name: 'Alisa',
    image: 'https://media.graphassets.com/Get3SJCpTcGhb8D1EoUg',
  },
  {
    name: 'Zafina',
    image: 'https://media.graphassets.com/1Sqx7Nq3SlqTAAPwwKEZ',
  },
  {
    name: 'Devil Jin',
    image: 'https://media.graphassets.com/zynIZY0ReGzU4gKtGq3g',
  },
  {
    name: 'Victor',
    image: 'https://media.graphassets.com/6EHRVUoqTnSDkZ9tkEeU',
  },
  {
    name: 'Reina',
    image: 'https://media.graphassets.com/TfCpIKWORbmnzyPWwqkK',
  },
  { name: 'Eddy', image: 'https://media.graphassets.com/wu2GPdDXTfyrLIAeNE3B' },
  {
    name: 'Lidia',
    image: 'https://media.graphassets.com/nVOhZaboQlK0mHMusM3I',
  },
];

async function addCharacters() {
  try {
    await mongoose.connect(
      'mongodb+srv://blue:bluestorm1845@mern.jhpko.mongodb.net/tekken'
    );

    // Insere vários personagens de uma vez
    await Character.insertMany(characters);
    console.log('Personagens adicionados com sucesso!');
  } catch (error) {
    console.error('Erro ao adicionar personagens:', error);
  } finally {
    mongoose.connection.close();
  }
}

addCharacters();
