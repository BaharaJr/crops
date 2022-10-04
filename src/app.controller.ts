import { Controller, Get, Param, Post, Req, Res } from "@nestjs/common";
import { writeFileSync } from "fs";

@Controller()
export class AppController {
  @Get()
  status() {
    this.clean();
    return { status: 200, message: "OK" };
  }

  clean = () => {
    const clean = {};
    Object.keys(data).forEach((key) => {
      clean[key] = data[key].map((keyData: { [x: string]: string }) => {
        const keys = Object.keys(keyData);
        const cleanKeys = {};
        keys.forEach((cleanKey, index) => {
          if (cleanKey === "FIELD2") {
            cleanKeys["district"] = keyData[cleanKey];
          }

          if (!cleanKey.includes("FIELD")) {
            cleanKeys[cleanKey] = {
              min: keyData[cleanKey],
              max: keyData[keys[index + 1]],
            };
          }
        });
        return cleanKeys;
      });
    });
    writeFileSync("data.json", JSON.stringify(clean));
  };
}

const data = {
  Arusha: [
    {
      FIELD2: "Arusha",
      "Maize (Mahindi)": "95,000",
      FIELD4: "98,000",
      "Rice (Mchele)": "230,000",
      FIELD6: "280,000",
      "Sorghum (Mtama)": "75,000",
      FIELD8: "80,000",
      "Bulrush Millet (Uwele)": "75,000",
      FIELD10: "85,000",
      "Finger Millet (Ulezi)": "120,000",
      FIELD12: "125,000",
      "Wheat Grain  (Ngano)": "130,000",
      FIELD14: "150,000",
      "Beans (Maharage)": "220,000",
      FIELD16: "280,000",
      "Irish Potatoes (Viazi Mviringo)": "75,000",
      FIELD18: "80,000",
    },
  ],
  "Dar es Salaam": [
    {
      FIELD2: "Tandika",
      "Maize (Mahindi)": "98,000",
      FIELD4: "120,000",
      "Rice (Mchele)": "240,000",
      FIELD6: "330,000",
      "Sorghum (Mtama)": "100,000",
      FIELD8: "120,000",
      "Bulrush Millet (Uwele)": "110,000",
      FIELD10: "120,000",
      "Finger Millet (Ulezi)": "170,000",
      FIELD12: "180,000",
      "Wheat Grain  (Ngano)": "200,000",
      FIELD14: "220,000",
      "Beans (Maharage)": "280,000",
      FIELD16: "320,000",
      "Irish Potatoes (Viazi Mviringo)": "68,000",
      FIELD18: "70,000",
    },
  ],
  Dodoma: [
    {
      FIELD2: "Kabaigwa",
      "Maize (Mahindi)": "95,000",
      FIELD4: "95,000",
      "Rice (Mchele)": "NA",
      FIELD6: "NA",
      "Sorghum (Mtama)": "72,000",
      FIELD8: "77,500",
      "Bulrush Millet (Uwele)": "NA",
      FIELD10: "NA",
      "Finger Millet (Ulezi)": "NA",
      FIELD12: "NA",
      "Wheat Grain  (Ngano)": "NA",
      FIELD14: "NA",
      "Beans (Maharage)": "NA",
      FIELD16: "NA",
      "Irish Potatoes (Viazi Mviringo)": "NA",
      FIELD18: "NA",
    },
    {
      FIELD2: "Majengo",
      "Maize (Mahindi)": "92,000",
      FIELD4: "98,000",
      "Rice (Mchele)": "250,000",
      FIELD6: "310,000",
      "Sorghum (Mtama)": "59,000",
      FIELD8: "76,000",
      "Bulrush Millet (Uwele)": "70,000",
      FIELD10: "80,000",
      "Finger Millet (Ulezi)": "120,000",
      FIELD12: "130,000",
      "Wheat Grain  (Ngano)": "180,000",
      FIELD14: "182,400",
      "Beans (Maharage)": "250,000",
      FIELD16: "298,000",
      "Irish Potatoes (Viazi Mviringo)": "69,500",
      FIELD18: "90,000",
    },
  ],
  Iringa: [
    {
      FIELD2: "Iringa",
      "Maize (Mahindi)": "80,000",
      FIELD4: "80,000",
      "Rice (Mchele)": "170,000",
      FIELD6: "250,000",
      "Sorghum (Mtama)": "100,000",
      FIELD8: "100,000",
      "Bulrush Millet (Uwele)": "150,000",
      FIELD10: "150,000",
      "Finger Millet (Ulezi)": "150,000",
      FIELD12: "150,000",
      "Wheat Grain  (Ngano)": "180,000",
      FIELD14: "200,000",
      "Beans (Maharage)": "180,000",
      FIELD16: "250,000",
      "Irish Potatoes (Viazi Mviringo)": "70,000",
      FIELD18: "70,000",
    },
  ],
  Kagera: [
    {
      FIELD2: "Bukoba",
      "Maize (Mahindi)": "120,000",
      FIELD4: "125,000",
      "Rice (Mchele)": "250,000",
      FIELD6: "350,000",
      "Sorghum (Mtama)": "160,000",
      FIELD8: "180,000",
      "Bulrush Millet (Uwele)": "180,000",
      FIELD10: "190,000",
      "Finger Millet (Ulezi)": "180,000",
      FIELD12: "190,000",
      "Wheat Grain  (Ngano)": "200,000",
      FIELD14: "210,000",
      "Beans (Maharage)": "250,000",
      FIELD16: "300,000",
      "Irish Potatoes (Viazi Mviringo)": "80,000",
      FIELD18: "90,000",
    },
  ],
  Katavi: [
    {
      FIELD2: "Mpanda",
      "Maize (Mahindi)": "95,000",
      FIELD4: "98,000",
      "Rice (Mchele)": "230,000",
      FIELD6: "240,000",
      "Sorghum (Mtama)": "NA",
      FIELD8: "NA",
      "Bulrush Millet (Uwele)": "NA",
      FIELD10: "NA",
      "Finger Millet (Ulezi)": "NA",
      FIELD12: "NA",
      "Wheat Grain  (Ngano)": "NA",
      FIELD14: "NA",
      "Beans (Maharage)": "235,000",
      FIELD16: "250,000",
      "Irish Potatoes (Viazi Mviringo)": "65,000",
      FIELD18: "65,000",
    },
  ],
  Lindi: [
    {
      FIELD2: "Lindi",
      "Maize (Mahindi)": "100,000",
      FIELD4: "140,000",
      "Rice (Mchele)": "235,000",
      FIELD6: "310,000",
      "Sorghum (Mtama)": "100,000",
      FIELD8: "200,000",
      "Bulrush Millet (Uwele)": "NA",
      FIELD10: "NA",
      "Finger Millet (Ulezi)": "NA",
      FIELD12: "NA",
      "Wheat Grain  (Ngano)": "300,000",
      FIELD14: "400,000",
      "Beans (Maharage)": "260,000",
      FIELD16: "280,000",
      "Irish Potatoes (Viazi Mviringo)": "120,000",
      FIELD18: "120,000",
    },
  ],
  Manyara: [
    {
      FIELD2: "Babati",
      "Maize (Mahindi)": "100,000",
      FIELD4: "114,000",
      "Rice (Mchele)": "270,000",
      FIELD6: "300,000",
      "Sorghum (Mtama)": "90,000",
      FIELD8: "110,000",
      "Bulrush Millet (Uwele)": "90,000",
      FIELD10: "110,000",
      "Finger Millet (Ulezi)": "120,000",
      FIELD12: "130,000",
      "Wheat Grain  (Ngano)": "210,000",
      FIELD14: "230,000",
      "Beans (Maharage)": "240,000",
      FIELD16: "250,000",
      "Irish Potatoes (Viazi Mviringo)": "115,000",
      FIELD18: "115,000",
    },
  ],
  Mbeya: [
    {
      FIELD2: "Mbeya",
      "Maize (Mahindi)": "90,000",
      FIELD4: "90,000",
      "Rice (Mchele)": "240,000",
      FIELD6: "240,000",
      "Sorghum (Mtama)": "170,000",
      FIELD8: "170,000",
      "Bulrush Millet (Uwele)": "NA",
      FIELD10: "NA",
      "Finger Millet (Ulezi)": "NA",
      FIELD12: "NA",
      "Wheat Grain  (Ngano)": "160,000",
      FIELD14: "160,000",
      "Beans (Maharage)": "210,000",
      FIELD16: "228,000",
      "Irish Potatoes (Viazi Mviringo)": "48,000",
      FIELD18: "48,000",
    },
  ],
  Mtwara: [
    {
      FIELD2: "Mtwara",
      "Maize (Mahindi)": "88,000",
      FIELD4: "88,000",
      "Rice (Mchele)": "230,000",
      FIELD6: "240,000",
      "Sorghum (Mtama)": "100,000",
      FIELD8: "100,000",
      "Bulrush Millet (Uwele)": "NA",
      FIELD10: "NA",
      "Finger Millet (Ulezi)": "180,000",
      FIELD12: "180,000",
      "Wheat Grain  (Ngano)": "NA",
      FIELD14: "NA",
      "Beans (Maharage)": "250,000",
      FIELD16: "270,000",
      "Irish Potatoes (Viazi Mviringo)": "70,000",
      FIELD18: "75,000",
    },
  ],
  Mwanza: [
    {
      FIELD2: "Mwanza",
      "Maize (Mahindi)": "115,000",
      FIELD4: "122,000",
      "Rice (Mchele)": "250,000",
      FIELD6: "300,000",
      "Sorghum (Mtama)": "160,000",
      FIELD8: "200,000",
      "Bulrush Millet (Uwele)": "150,000",
      FIELD10: "200,000",
      "Finger Millet (Ulezi)": "180,000",
      FIELD12: "200,000",
      "Wheat Grain  (Ngano)": "NA",
      FIELD14: "NA",
      "Beans (Maharage)": "280,000",
      FIELD16: "360,000",
      "Irish Potatoes (Viazi Mviringo)": "95,000",
      FIELD18: "100,000",
    },
  ],
  Njombe: [
    {
      FIELD2: "Mkoa",
      "Maize (Mahindi)": "83,000",
      FIELD4: "90,000",
      "Rice (Mchele)": "220,000",
      FIELD6: "250,000",
      "Sorghum (Mtama)": "NA",
      FIELD8: "NA",
      "Bulrush Millet (Uwele)": "NA",
      FIELD10: "NA",
      "Finger Millet (Ulezi)": "200,000",
      FIELD12: "220,000",
      "Wheat Grain  (Ngano)": "200,000",
      FIELD14: "220,000",
      "Beans (Maharage)": "180,000",
      FIELD16: "200,000",
      "Irish Potatoes (Viazi Mviringo)": "60,000",
      FIELD18: "70,000",
    },
  ],
  Rukwa: [
    {
      FIELD2: "Sumbawanga",
      "Maize (Mahindi)": "80,000",
      FIELD4: "90,000",
      "Rice (Mchele)": "180,000",
      FIELD6: "200,000",
      "Sorghum (Mtama)": "NA",
      FIELD8: "NA",
      "Bulrush Millet (Uwele)": "NA",
      FIELD10: "NA",
      "Finger Millet (Ulezi)": "230,000",
      FIELD12: "240,000",
      "Wheat Grain  (Ngano)": "190,000",
      FIELD14: "195,000",
      "Beans (Maharage)": "210,000",
      FIELD16: "300,000",
      "Irish Potatoes (Viazi Mviringo)": "70,000",
      FIELD18: "70,000",
    },
  ],
  Ruvuma: [
    {
      FIELD2: "Songea",
      "Maize (Mahindi)": "70,000",
      FIELD4: "80,000",
      "Rice (Mchele)": "200,000",
      FIELD6: "280,000",
      "Sorghum (Mtama)": "NA",
      FIELD8: "NA",
      "Bulrush Millet (Uwele)": "NA",
      FIELD10: "NA",
      "Finger Millet (Ulezi)": "100,000",
      FIELD12: "100,000",
      "Wheat Grain  (Ngano)": "NA",
      FIELD14: "NA",
      "Beans (Maharage)": "200,000",
      FIELD16: "220,000",
      "Irish Potatoes (Viazi Mviringo)": "90,000",
      FIELD18: "95,000",
    },
  ],
  Tabora: [
    {
      FIELD2: "Tabora",
      "Maize (Mahindi)": "92,000",
      FIELD4: "96,000",
      "Rice (Mchele)": "240,000",
      FIELD6: "260,000",
      "Sorghum (Mtama)": "140,000",
      FIELD8: "150,000",
      "Bulrush Millet (Uwele)": "NA",
      FIELD10: "NA",
      "Finger Millet (Ulezi)": "180,000",
      FIELD12: "190,000",
      "Wheat Grain  (Ngano)": "NA",
      FIELD14: "NA",
      "Beans (Maharage)": "290,000",
      FIELD16: "300,000",
      "Irish Potatoes (Viazi Mviringo)": "80,000",
      FIELD18: "90,000",
    },
  ],
  Tanga: [
    {
      FIELD2: "Tanga",
      "Maize (Mahindi)": "110,500",
      FIELD4: "112,500",
      "Rice (Mchele)": "240,500",
      FIELD6: "260,500",
      "Sorghum (Mtama)": "110,000",
      FIELD8: "110,000",
      "Bulrush Millet (Uwele)": "199,000",
      FIELD10: "199,000",
      "Finger Millet (Ulezi)": "202,500",
      FIELD12: "202,500",
      "Wheat Grain  (Ngano)": "199,000",
      FIELD14: "200,000",
      "Beans (Maharage)": "220,000",
      FIELD16: "250,000",
      "Irish Potatoes (Viazi Mviringo)": "77,000",
      FIELD18: "80,000",
    },
  ],
};
