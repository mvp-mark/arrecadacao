import connection from "../database/connection";
import * as fs from "fs";
import { stringify } from "querystring";
import { Response, Request } from "express";
import { attachOnDuplicateUpdate } from "knex-on-duplicate-update";
import { isNumber } from "util";

attachOnDuplicateUpdate();

interface Acumulator {
  i: number;
}

class ArquivoController {
  async create(req: Request, res: Response) {
    var file = {};
    let i: any = 0;
    const filename = req.file.filename;
    const arr = {
      arr: filename,
    };
    console.log("passou por aqui", arr);

    const trx = await connection.transaction();
    try {
      fs.readFile(req.file.path, async function (_err, data) {
        // if (err) throw err;
        var array = data.toString().split("\n");
        let arr = 0;
        let sum: number;
        // var total;
        var size = array.length;
        // var boletoValue = ;
        const first = array[0].toString();

        var last = array[size - 2];
        var total = array.reduce((sum, value)=>{

          
        })
        for (i in array) {
          // i=i+1;
          if (array[i].toString().startsWith("G")) {
            sum = arr +parseInt(array[i].substring(81, 93));
            total = total;
          }
        }
        const headerFile = {
          codRegHeader: first.substring(0, 1),
          totalBoletos: total,
          codShippHeader: first.substring(1, 2),
          codAgreementHeader: first.substring(2, 22),
          companyHeader: first.substring(22, 42),
          codBankHeader: first.substring(42, 45),
          bankNameHeader: first.substring(45, 65),
          dateFileHeader: first.substring(65, 73),
          nsaHeader: first.substring(73, 79),
          layoutHeader: first.substring(79, 81),
          barCodeHeader: first.substring(81, 98),
          fillerHeader: first.substring(98, 150),
          codRegTrailler: last.substring(0, 1),
          tRegFileTrailler: last.substring(1, 7),
          totalValueTrailler: last.substring(7, 24),
          fillerTrailler: last.substring(24, 150),
          originNameFile: req.file.filename,
        };

        console.log(headerFile);

        const fileIds = await trx("arquivo")
          .insert(headerFile)
          // .returning('idHeader')//.onDuplicateUpdate('nsaHeader')
          .then(([idHeader]) => {
            console.log("entrou o cabeçalho", idHeader);
            // return res.json({ test });
            return idHeader;
          })
          .catch((err) => {
            // if(err.message === "ER_DUP_ENTRY"){
            //   return res.status(401).json({
            //     error: "Arrecadação duplicada",
            //   });
            // }
            throw err;
          })
          .finally(() => trx.destroy);
        // console.log(file);
        // function boletos() {
        let linha: any = [];
        var linhaBody = {};
        for (i in array) {
          // i=i+1;
          if (array[i].toString().startsWith("G")) {
            (linhaBody = {
              // PAGINA: i,
              codRegBody: array[i].substring(0, 1),
              idAgencyBody: array[i].substring(1, 21),
              datePaymentBody: array[i].substring(21, 29),
              dateCreditBody: array[i].substring(29, 37),
              barCodeBody: array[i].substring(37, 81),
              valueReciveBody: array[i].substring(81, 93),
              valueTaxBody: array[i].substring(93, 100),
              nsrBody: array[i].substring(100, 108),
              codAgencyBody: array[i].substring(108, 116),
              collectionBody: array[i].substring(116, 117),
              authNumberBody: array[i].substring(117, 140),
              paymentFormBody: array[i].substring(140, 141),
              reservedFutureBody: array[i].substring(141, 150),
              idArquivo: array[0].substring(73, 79),
            }),
              // (linha[i - 1] = linhaBody);
              (linha[i - 1] = linhaBody);
          }
          // console.log('----------------------------',i);
        }
        // console.log(linha);
        await trx("boleto")
          .insert(linha)
          .then(() => {
            console.log("entrou os boletos");
            // return res.json({ linha });
            // );
          })
          .catch((err) => {
            // trx.rollback();
            // return res.status(400).json({
            //   error: "Unexpected error while creating new class",
            // });
            throw err;
          })

          .finally(() => trx.destroy);

        await trx.commit();

        console.log("finished processing");
        console.log(arr);
        return res.status(200).json({ id: fileIds });
      });
    } catch (err) {
      console.error(err);
      // console.log("esse aqui é o erro", err);

      if (err) {
        return res.status(401).json({
          error: "Arrecadação duplicada",
        });
      } else {
        await trx.rollback();
        return res.status(401).json({
          error: "Unespected error",
        });
      }
    }
  }
  async index(req: Request, res: Response) {
    const index = await connection("arquivo").select("*");

    return res.status(200).json(index);
  }
  // async index(req, res) {}
}

export default ArquivoController;
