import chalk from "chalk";

const promptSchemaTax = [
  {
    name: "select",
    description: chalk.yellow.bold(
      "Escolha a ferramenta (1 - Brasil ou (2- Estados Unidos ou (3- Japão ou (4-Canadá"
    ),
    pattern: /^[1-5]+$/,
    message: chalk.red.italic("Escolha apenas entre 1 e 4"),
    required: true,
  },
];

export default promptSchemaTax;
