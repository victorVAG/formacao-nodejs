import chalk from "chalk";

const promptSchemaPrice = [
  {
    name: "select",
    description: chalk.yellow.bold(
      "Digite o preço"
    ),
    pattern: /[^a-z ]\ *([.0-9])*\d/g,
    message: chalk.red.italic("Digite um número valido!"),
    required: true,
  },
];

export default promptSchemaPrice;
