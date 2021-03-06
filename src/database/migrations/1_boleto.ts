import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("boleto", table=> {
    table.bigIncrements("idBoleto");
    table.string("codRegBody");
    table.string("idAgencyBody");
    table.string("datePaymentBody");
    table.string("dateCreditBody");
    table.string("barCodeBody");
    table.integer("valueReciveBody");
    table.integer("valueTaxBody");
    table.string("nsrBody");
    table.string("codAgencyBody");
    table.string("collectionBody");
    table.string("authNumberBody");
    table.string("paymentFormBody");
    table.string("reservedFutureBody");
    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.string("idArquivo").notNullable();
    
    table.foreign('idArquivo').references("nsaHeader").inTable("arquivo");

    //   table.foreign('idArquivo').references('id').inTable('arquivo')
  });
};

export async function down(knex: Knex) {
  return knex.schema.dropTable("boleto");
};
