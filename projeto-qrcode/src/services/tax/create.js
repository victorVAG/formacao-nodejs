import prompt from "prompt";
import promptTaxSchema from "../../prompts-schema/prompt-schema-tax.js";
import handleTaxCalculate from "./handleTaxCalculate.js";
import promptSchemaPrice from "../../prompts-schema/promp-schema-price.js";
 
async function calculateTax() {
   
    
	prompt.start();
    prompt.get(promptTaxSchema, handleTaxCalculate)
	
    
}
async function getPrice() {
     prompt.start();
    return await prompt.get(promptSchemaPrice);
}
export {getPrice,calculateTax};