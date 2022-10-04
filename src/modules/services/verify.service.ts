import { Injectable } from "@nestjs/common";
import { readFileSync } from "fs";
import { locations } from "../../core/system/system.config";
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
      price: `Tshs.${Math.floor(Math.random() * 10000000)}/-`,
      zao: "Karanga",
      id: "2",
    },
    {
      code: "1235",
      supplier: "Justine",
      manufacturer: "IDD",
      price: `Tshs.${Math.floor(Math.random() * 10000000)}/-`,
      zao: "Mahindi",
      id: "1",
    },
    {
      code: "1236",
      supplier: "Justine",
      manufacturer: "IDD",
      price: `Tshs.${Math.floor(Math.random() * 10000000)}/-`,
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
    if (text == "") {
      response = `CON Karibu Soko Mkononi
      1. Pata bei ya mazao sokoni
      2. Hakiki ubora wa mbegu au pembejeo
      3. Jiunge kupata bei ya soko kila siku
      4. Toa taarifa ya pembejeo au mbegu
      5. Toa taarifa ya tatizo au ugonjwa wa mazao
      6. Sajili namba ya mpata taarifa`;
    } else {
      response = this.checkText(text, phoneNumber);
    }

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
      response = this.checkGreaterThan3LessThan7(text);
    }

    if (text && text.includes("*")) {
      const numbers = text.split("*");
      response = this.checkRepeating(numbers, phoneNumber);
    }
    return response;
  };

  checkGreaterThan3LessThan7 = (text: string) => {
    let response = "";
    if (text == "5") {
      response = "CON Toa taarifa ya tatizo au ugonjwa wa mazao";
    }

    if (text == "4") {
      response = "CON Taarifa ya mbegu au pembejeo";
    }

    if (text == "6") {
      response = "CON Ingiza number ya mpata taarifa ikianza na +255";
    }
    return response;
  };

  checkLessOrEqualTo3 = (text: string, phoneNumber: string) => {
    let response = "";
    if (text == "1") {
      response = `CON Jina la zao likifatiwa na alama ya kutoa weka mkoa`;
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

  checkRepeating = (numbers: any[], phone: string) => {
    const crops: any = JSON.parse(readFileSync(locations.data, "utf-8"));
    let response = "";
    if (Number(numbers[0]) <= 3) {
      response = this.checkNumbersOfLessOrEqual3(numbers, crops);
    } else {
      response = this.checkNumbersOfGreaterThan3(numbers, phone);
    }

    return response;
  };

  checkNumbersOfLessOrEqual3 = (numbers: any[], crops: any) => {
    const numberLettr = Number(numbers[0]);
    switch (numberLettr) {
      case 1:
        return this.getPrice(numbers, crops);
      case 2:
        return this.validateCrop(numbers);
      default:
        return "END Ahsante kwa kutumia shamba kiganjani";
    }
  };
  checkNumbersOfGreaterThan3 = (numbers: any[], phone: string) => {
    const numberLettr = Number(numbers[0]);
    switch (numberLettr) {
      case 4:
        return this.taarifa(numbers, 4);
      case 5:
        return this.taarifa(numbers, 5);
      case 6:
        return this.register(numbers, phone);
      default:
        return "END Ahsante kwa kutumia shamba kiganjani";
    }
  };

  register = (numbers: any[], phone: string) => {
    if (this.access.includes(phone)) {
      this.registered = [...this.registered, numbers[1]];
      this.sendToNumber({
        message: `Umesajiliwa kupokea taarifa muhimu za kilimo na ${phone}`,
        phone: numbers[1],
      });
      return `END Mpata taarifa mwenye nambari ${numbers[1]} amepokelewa.`;
    } else {
      return `END Hauna ruhusa ya kutunza mpata taarifa`;
    }
  };
  taarifa = (numbers: any, stage: number) => {
    if (this.registered.length === 0) {
      return `END Hakuna wapokea taarifa, taarifa itatunzwa.`;
    }
    this.sendToNumber({ message: numbers[1], phone: this.registered });
    return `END Ahsante kwa kutoa taarifa ya ${
      stage === 4 ? "ugonjwa wa zao" : "bidhaa isiyobora"
    }`;
  };
  validateCrop = (numbers: any[]) => {
    try {
      console.log(numbers);
      let response = "";
      const number = numbers[numbers.length - 1];
      const price = this.crops.find(({ code }) =>
        code.toLowerCase().includes(number)
      );
      console.log(JSON.stringify(price));
      if (price) {
        response = `END
      Pembejeo ni halali. 
      Bei ya ${price.zao} kwa gunia ni ${price.price}. 
      Mzalishaji: ${price.manufacturer}
      Msambazaji: ${price.supplier}`;
      } else {
        response = `END Pembejeo haijasajiliwa kwenye kanzi data yetu inaweza kuwa bandia/feki`;
      }
      return response;
    } catch (e) {
      return `END Tunapata tatizo kuhakiki pembejo tafadhali jaribu tena baadae`;
    }
  };

  getPrice = (numbers: any[], crops: any) => {
    let response = "";
    const number = numbers[numbers.length - 1];
    const zao = number.includes("-") ? number.split("-") : number.split("_");
    const region = Object.keys(crops).find((key) =>
      key.toLowerCase().includes(zao[1] || "")
    );
    if (!region) {
      response = `END Hakuna taarifa za mkoa wa ${zao[1]}`;
    } else {
      const crop = Object.keys(crops[region][0]).find((key) =>
        key.toLowerCase().includes(zao[0])
      );
      if (!crop) {
        response = `END Hakuna taarifa za zao ${zao[0]} mkoani ${region}`;
      } else {
        const price = crops[region][0][crop];
        response = `END Bei ya ${crop}, mkoani ${region}, wilaya ya ${crops[region][0]?.district}. 
        Bei ya juu: Tshs. ${price.max}/-. 
        Bei ya chini Tshs. ${price.min}/-`;
      }
    }
    return response;
  };
  getRepeatedGreaterThan1 = (numbers: any[], crops: any) => {
    let response = "";
    const number = numbers[numbers.length - 1];
    const price = crops.find(({ zao }) => zao?.toLowerCase()?.includes(number));
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
