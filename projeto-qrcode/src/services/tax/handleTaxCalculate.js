import taxData from "./utils/database.js";
import chalk from "chalk";
import * as create from "./create.js";

function getCountryByNum(num) {
  for (const [pais, info] of Object.entries(taxData)) {
    if (info.num === num) {
      return { nome: pais, ...info };
    }
  }
  return null;
}

async function handle(err, result) {
  if (err) {
    console.log("Error on application");
    return;
  }

  const resultado = getCountryByNum(parseInt(result.select));

  if (!resultado) {
    console.log("País inválido.");
    return;
  }

  console.log(`País: ${resultado.nome}, Taxa: ${resultado.tax}%`);

  const precoBaseResult = await create.getPrice();
  const precoBase = parseFloat(precoBaseResult.select); 

  const finalPrice = precoBase + (precoBase * resultado.tax / 100);
  console.log(chalk.green(`Preço final com taxa: R$ ${finalPrice.toFixed(2)}`));
}

export default handle;
