import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("arquivo", (table) => {
    table.increments("idHeader").notNullable();
    table.string("totalBoletos").notNullable();
    table.string("codRegHeader").notNullable();
    table.string("codShippHeader").notNullable();
    table.string("codAgreementHeader").notNullable();
    table.string("companyHeader").notNullable();
    table.string("codBankHeader").notNullable();
    table.string("bankNameHeader").notNullable();
    table.string("dateFileHeader").notNullable();
    table.string("nsaHeader").unique().notNullable();
    table.string("layoutHeader").notNullable();
    table.string("barCodeHeader").notNullable();
    table.string("fillerHeader").notNullable();
    table.string("codRegTrailler").notNullable();
    table.string("tRegFileTrailler").notNullable();
    table.integer("totalValueTrailler").notNullable();
    table.string("formatedtotalValueTrailler").notNullable();
    table.string("fillerTrailler");
    table.string("originNameFile").notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());

  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("arquivo");
}
