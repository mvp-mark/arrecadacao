import connection from "../database/connection";
import * as fs from "fs";
import { stringify } from "querystring";
import { Response, Request } from "express";
import { attachOnDuplicateUpdate } from "knex-on-duplicate-update";
import { isNumber } from "util";
import currency from "../utils/currency";
import Test from "../utils/test";

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
        const totalValue = parseInt(last.substring(7, 24));
        var total = last.substring(7, 24);
        var one = Test(total);
       const formated = (one).toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })
        // var total = array.map((sum, value)=>{

        // })
        // for (i in array) {
        //   // i=i+1;
        //   if (array[i].toString().startsWith("G")) {
        //     sum = arr +parseInt(array[i].substring(81, 93));
        //     total = total;
        //   }
        // }
        const headerFile = {
          codRegHeader: first.substring(0, 1).trim(),
          totalBoletos: " ",
          codShippHeader: first.substring(1, 2).trim(),
          codAgreementHeader: first.substring(2, 22).trim(),
          companyHeader: first.substring(22, 42).trim(),
          codBankHeader: first.substring(42, 45).trim(),
          bankNameHeader: first.substring(45, 65).trim(),
          dateFileHeader: first.substring(65, 73).trim(),
          nsaHeader: first.substring(73, 79).trim(),
          layoutHeader: first.substring(79, 81).trim(),
          barCodeHeader: first.substring(81, 98).trim(),
          fillerHeader: first.substring(98, 150).trim(),
          codRegTrailler: last.substring(0, 1).trim(),
          tRegFileTrailler: last.substring(1, 7).trim(),
          totalValueTrailler: totalValue,
          formatedtotalValueTrailler: formated.trim(),
          // formatedtotalValueTrailler:"R$ "  +c?.value,
          fillerTrailler: last.substring(24, 150).trim(),
          originNameFile: req.file.filename.trim(),
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
              codRegBody: array[i].substring(0, 1).trim(),
              idAgencyBody: array[i].substring(1, 21).trim(),
              datePaymentBody: array[i].substring(21, 29).trim(),
              dateCreditBody: array[i].substring(29, 37).trim(),
              barCodeBody: array[i].substring(37, 81).trim(),
              valueReciveBody: array[i].substring(81, 93).trim(),
              valueTaxBody: array[i].substring(93, 100).trim(),
              nsrBody: array[i].substring(100, 108).trim(),
              codAgencyBody: array[i].substring(108, 116).trim(),
              collectionBody: array[i].substring(116, 117).trim(),
              authNumberBody: array[i].substring(117, 140).trim(),
              paymentFormBody: array[i].substring(140, 141).trim(),
              reservedFutureBody: array[i].substring(141, 150).trim(),
              idArquivo: array[0].substring(73, 79).trim(),
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
        return res.status(200).json({ id: headerFile.nsaHeader });
      });
    } catch (err) {
      console.error(err);
      // console.log("esse aqui é o erro", err);
      return res.status(401).json({
        error: "Unespected error",
      });

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
  async search(req: Request, res: Response){
    const id =req.query.id
    console.log("search id of recovery",id);
    const search = await connection('arquivo').select("*").where("nsaHeader","=", id);

    const boletos = await connection('boleto').select('*').where("idArquivo","=", id)
      
    return res.status(200).json({search, boletos});
  }
  // async index(req, res) {}
}

export default ArquivoController;
