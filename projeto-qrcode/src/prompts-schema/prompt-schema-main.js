import chalk from "chalk";

const promptSchemaMain = [
  {
    name: "select",
    description: chalk.yellow.bold(
      "Escolha a ferramenta (1 - QRCODE ou (2- PASSWORD ou (3- TAXCALCULATE"
    ),
    pattern: /^[1-3]+$/,
    message: chalk.red.italic("Escolha apenas entre 1 ou 2 ou 3"),
    required: true,
  },
];

export default promptSchemaMain;
