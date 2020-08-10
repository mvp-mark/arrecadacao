import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("arquivo", (table) => {
    table.increments("idHeader");
    table.string("totalBoletos");
    table.string("codRegHeader");
    table.string("codShippHeader");
    table.string("codAgreementHeader");
    table.string("companyHeader");
    table.string("codBankHeader");
    table.string("bankNameHeader");
    table.string("dateFileHeader");
    table.string("nsaHeader").unique();
    table.string("layoutHeader");
    table.string("barCodeHeader");
    table.string("fillerHeader");
    table.string("codRegTrailler");
    table.string("tRegFileTrailler");
    table.string("totalValueTrailler");
    table.string("fillerTrailler");
    table.string("originNameFile");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("arquivo");
}
