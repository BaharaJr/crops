import { Injectable } from "@nestjs/common";
require("dotenv").config();
const AfricasTalking = require("africastalking")({
  username: process.env.AT_USERNAME,
  apiKey: process.env.AT_APIKEY,
});

const sms = AfricasTalking.SMS;

@Injectable()
export class VerifyService {
  notify = [];
  access = ["+255757714834", "+255745909129", "+255764480794"];
  registered = [];
  crops = [
    {
      code: "1234",
      supplier: "Justine",
      manufacturer: "IDD",
      price: `Tshs.${Math.floor(Math.random() * 10000)}/-`,
      zao: "Karanga",
      id: "2",
    },
    {
      code: "1235",
      supplier: "Justine",
      manufacturer: "IDD",
      price: `Tshs.${Math.floor(Math.random() * 10000)}/-`,
      zao: "Mahindi",
      id: "1",
    },
    {
      code: "1236",
      supplier: "Justine",
      manufacturer: "IDD",
      price: `Tshs.${Math.floor(Math.random() * 10000)}/-`,
      zao: "Njugu",
      id: "3",
    },
  ];

  sendToNumber = async ({ message, phone }) => {
    try {
      const result = await sms.send({
        to: [phone],
        message,
      });
      console.log(JSON.stringify(result));
    } catch (ex) {
      console.error(ex);
    }
  };

  verify = (
    req: { body: { phoneNumber: any; text: any } },
    res: { set: (arg0: string) => void; send: (arg0: string) => void }
  ) => {
    const { phoneNumber, text } = req.body;
    let response = "";
    if (text === " " || !text) {
      response = `CON Karibu Soko Mkononi
      1. Pata bei ya mazao sokoni
      2. Hakiki ubora wa mbegu au pembejeo
      3. Jiunge kupata bei ya soko kila siku
      4. Toa taarifa ya pembejeo au mbegu isiyo na ubora
      5. Toa taarifa ya tatizo au ugonjwa wa mazao
      6. Sajili namba ya mpata taarifa`;
    }
    response = this.checkText(text, phoneNumber);

    if (response === "") {
      response = `END Ahsante kwa kutumia soko mkononi`;
    }

    res.set("Content-Type: text/plain");
    res.send(response);
  };

  checkText = (text: string, phoneNumber: string) => {
    let response = "";
    if (Number(text) <= 3) {
      response = this.checkLessOrEqualTo3(text, phoneNumber);
    }
    if (Number(text) > 3 && Number(text) <= 6) {
      response = this.checkGreaterThan3LessThan7(text, phoneNumber);
    }

    if (text && text.includes("*")) {
      const numbers = text.split("*");
      response = this.checkRepeating(numbers);
    }
    return response;
  };

  checkGreaterThan3LessThan7 = (text: string, phoneNumber: string) => {
    let response = "";
    if (text == "4") {
      response = "CON Taarifa ya ugonjwa";
    }

    if (text == "5") {
      response = "CON Taarifa ya mbegu au pembejeo";
    }

    if (text == "6") {
      response = "CON Ingiza number ya mpata taarifa";
    }
    return response;
  };

  checkLessOrEqualTo3 = (text: string, phoneNumber: string) => {
    let response = "";
    if (text == "1") {
      response = `CON Weka jina la zao`;
    }
    if (text == "2") {
      response = `CON Ingiza namba ya pembejeo`;
    }
    if (text == "3") {
      response = `END Ahsante kwa kutumia soko mkononi. 
      Utapokea masoko kwenye number ${phoneNumber} kila siku`;
      this.sendToNumber({
        message: "Ahsante kwa kujiunga na huduma ya masoko mkonni",
        phone: phoneNumber,
      });
      this.notify = [...this.notify, phoneNumber];
    }
    return response;
  };

  checkRepeating = (numbers: any[]) => {
    let response = "";
    if (Number(numbers[0]) === 1) {
      const number = numbers[numbers.length - 1];
      const price = this.crops.find(({ zao }) =>
        zao?.toLowerCase()?.includes(number)
      );
      response = `END Bei ya ${price.zao} kwa gunia ni ${price.price}`;
    } else {
      return this.getRepeatedGreaterThan1(numbers);
    }
    return response;
  };
  getRepeatedGreaterThan1 = (numbers: any[]) => {
    let response = "";
    const number = numbers[numbers.length - 1];
    const price = this.crops.find(({ zao }) =>
      zao?.toLowerCase()?.includes(number)
    );
    if (price) {
      response = `END Pembejeo ni halali. 
        Bei ya ${price.zao} kwa gunia ni ${price.price}. 
        Mzalishaji: ${price.manufacturer}
        Msambazaji: ${price.supplier}`;
    } else {
      response = `END Pembejeo haijasajiliwa kwenye kanzi data yetu inaweza kuwa bandia/feki`;
    }
    return response;
  };
}
