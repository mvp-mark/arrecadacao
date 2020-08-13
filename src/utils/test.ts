import currency from "./currency";

export default function Test(total: string ) {
  const formated = new  currency(total, {
      fromCents: true,
    });

    return formated;
}