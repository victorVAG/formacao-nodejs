const { serialize } = require('node:v8');

let player1 = {};

let player2 = {};
const characterList = [
  {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
  },
  {
    NOME: "Peach",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 2,
    PONTOS: 0,
  },
  {
    NOME: "Yoshi",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 4,
    PODER: 3,
    PONTOS: 0,
  },
  {
    NOME: "Bowser",
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
  },
  {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
  },
  {
    NOME: "Donkey Kong",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
  },
];
async function search(num) {
  const readline = require('node:readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {

    let response = "";

    rl.question(`Escreva o nome do personagem Player ${num}: `, name => {

      
      name = name.trim().toUpperCase();
      
      for (let i = 0; i < characterList.length; i++) {
        if (name === characterList[i].NOME.toUpperCase()) {
          response = characterList[i];
          resolve(response);
        }
      }
      if (response === "") {
        console.log("Personagem não encontrado! Tente novamente");

        resolve(null);
      }

      rl.close();

    });

  })

}
async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
  }

  return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute
    }`
  );
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);

    // sortear bloco
    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`);

    // rolar os dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    //teste de habilidade
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
      totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

      await logRollResult(
        character1.NOME,
        "velocidade",
        diceResult1,
        character1.VELOCIDADE
      );

      await logRollResult(
        character2.NOME,
        "velocidade",
        diceResult2,
        character2.VELOCIDADE
      );
    }

    if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
      totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

      await logRollResult(
        character1.NOME,
        "manobrabilidade",
        diceResult1,
        character1.MANOBRABILIDADE
      );

      await logRollResult(
        character2.NOME,
        "manobrabilidade",
        diceResult2,
        character2.MANOBRABILIDADE
      );
    }

    if (block === "CONFRONTO") {
      let powerResult1 = diceResult1 + character1.PODER;
      let powerResult2 = diceResult2 + character2.PODER;

      console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);

      await logRollResult(
        character1.NOME,
        "poder",
        diceResult1,
        character1.PODER
      );

      await logRollResult(
        character2.NOME,
        "poder",
        diceResult2,
        character2.PODER
      );

      if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
        let points = await conflictsType(character1, character2);
        console.log(
          `${character1.NOME} venceu o confronto! ${character2.NOME} perdeu ${points} ponto`
        );
        character2.PONTOS -= points;
        character1.PONTOS += await boost();
      }

      if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
        let points = await conflictsType(character1, character2);
        console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu ${points} ponto `);
        character1.PONTOS -= points;
        character2.PONTOS += await boost();
      }

      console.log(
        powerResult2 === powerResult1
          ? "Confronto empatado! Nenhum ponto foi perdido"
          : ""
      );
    }

    // verificando o vencedor
    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${character1.NOME} marcou um ponto!`);
      character1.PONTOS++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${character2.NOME} marcou um ponto!`);
      character2.PONTOS++;
    }

    console.log("-----------------------------");
  }
}
async function conflictsType(characterWinner, characterLoser) {
  let random = Math.floor(Math.random() * 2 + 1);
  if (random === 1) {
    console.log(`${characterWinner.NOME} ganhou um casco 🐢`);
    return 1;
  }
  if (random === 2) {
    console.log(`${characterWinner.NOME} ganhou uma 💣`);
    if (characterLoser.PONTOS > 1) {
      return 2;
    } else {
      return 1;
    }
  }
}
async function boost(character) {
  let random = Math.floor(Math.random() * 10 + 1);
  if (random === 1) {
    console.log(`${character.NOME} ganhou um turbo 💨!`);
    return 1;
  } else {
    return 0;
  }

}
async function declareWinner(character1, character2) {
  console.log("Resultado final:");
  console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
  console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

  if (character1.PONTOS > character2.PONTOS)
    console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆`);
  else if (character2.PONTOS > character1.PONTOS)
    console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆`);
  else console.log("A corrida terminou em empate");
}


(async function main() {
  do{player1 = await search(1);}while(player1 === null);
  do{player2 = await search(2);}while(player2 === null);
  console.log(
    `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`
  );
  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();
