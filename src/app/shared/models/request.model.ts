export class RequestModel{
  WAITING: [
    {
      "address": {
        "city": string,
        "complement": string,
        "id": any,
        "isMain": any,
        "name": any,
        "neighborhood": any,
        "number": any,
        "reference": any,
        "street": any,
        "uf": any
      },
      "changeMoney": any,
      "cpfOrCnpj": any,
      "dateAndHour": any,
      "deliveryPrice": any,
      "id": any,
      "productOrder": [
        {
          "additionals": [
            {
              "productAdditional": {
                "id": any,
                "name": any,
                "price": any
              },
              "quantity": any
            }
          ],
          "id": any,
          "note": any,
          "product": {
            "category": {
              "id": any,
              "isAvailable": true,
              "name": any,
              "position": any
            },
            "description": any,
            "id": any,
            "name": any,
            "priceDefault": any
          },
          "productSize": {
            "id": any,
            "price": any,
            "quantity": any,
            "unit": any
          },
          "quantity": any
        }
      ],
      "status": any,
      "typeDelivery": any,
      "typePay": any,
      "user": {
        "cellphone": any,
        "email": any,
        "id": any,
        "name": any,
        "typeLogin": any
      }
    }]
    PREPARING: [
      {
        "address": {
          "city": "string",
          "complement": "string",
          "id": 0,
          "isMain": true,
          "name": "string",
          "neighborhood": "string",
          "number": "string",
          "reference": "string",
          "street": "string",
          "uf": "string"
        },
        "changeMoney": 0,
        "cpfOrCnpj": "string",
        "dateAndHour": "2020-07-27T22:14:15.015Z",
        "deliveryPrice": 0,
        "id": 0,
        "productOrder": [
          {
            "additionals": [
              {
                "productAdditional": {
                  "id": 0,
                  "name": "string",
                  "price": 0
                },
                "quantity": 0
              }
            ],
            "id": 0,
            "note": "string",
            "product": {
              "category": {
                "id": 0,
                "isAvailable": true,
                "name": "string",
                "position": 0
              },
              "description": "string",
              "id": 0,
              "name": "string",
              "priceDefault": 0
            },
            "productSize": {
              "id": 0,
              "price": 0,
              "quantity": 0,
              "unit": "GRAMS"
            },
            "quantity": 0
          }
        ],
        "status": "WAITING",
        "typeDelivery": "PICKUP",
        "typePay": "MONEY",
        "user": {
          "cellphone": "string",
          "email": "string",
          "id": 0,
          "name": "string",
          "typeLogin": "DEFAULT"
        }
      }
    ]
    DELIVERING: [
      {
        "address": {
          "city": "string",
          "complement": "string",
          "id": 0,
          "isMain": true,
          "name": "string",
          "neighborhood": "string",
          "number": "string",
          "reference": "string",
          "street": "string",
          "uf": "string"
        },
        "changeMoney": 0,
        "cpfOrCnpj": "string",
        "dateAndHour": "2020-07-27T22:14:15.015Z",
        "deliveryPrice": 0,
        "id": 0,
        "productOrder": [
          {
            "additionals": [
              {
                "productAdditional": {
                  "id": 0,
                  "name": "string",
                  "price": 0
                },
                "quantity": 0
              }
            ],
            "id": 0,
            "note": "string",
            "product": {
              "category": {
                "id": 0,
                "isAvailable": true,
                "name": "string",
                "position": 0
              },
              "description": "string",
              "id": 0,
              "name": "string",
              "priceDefault": 0
            },
            "productSize": {
              "id": 0,
              "price": 0,
              "quantity": 0,
              "unit": "GRAMS"
            },
            "quantity": 0
          }
        ],
        "status": "WAITING",
        "typeDelivery": "PICKUP",
        "typePay": "MONEY",
        "user": {
          "cellphone": "string",
          "email": "string",
          "id": 0,
          "name": "string",
          "typeLogin": "DEFAULT"
        }
      }
    ]
    DELIVERED: [
      {
        "address": {
          "city": "string",
          "complement": "string",
          "id": 0,
          "isMain": true,
          "name": "string",
          "neighborhood": "string",
          "number": "string",
          "reference": "string",
          "street": "string",
          "uf": "string"
        },
        "changeMoney": 0,
        "cpfOrCnpj": "string",
        "dateAndHour": "2020-07-27T22:14:15.015Z",
        "deliveryPrice": 0,
        "id": 0,
        "productOrder": [
          {
            "additionals": [
              {
                "productAdditional": {
                  "id": 0,
                  "name": "string",
                  "price": 0
                },
                "quantity": 0
              }
            ],
            "id": 0,
            "note": "string",
            "product": {
              "category": {
                "id": 0,
                "isAvailable": true,
                "name": "string",
                "position": 0
              },
              "description": "string",
              "id": 0,
              "name": "string",
              "priceDefault": 0
            },
            "productSize": {
              "id": 0,
              "price": 0,
              "quantity": 0,
              "unit": "GRAMS"
            },
            "quantity": 0
          }
        ],
        "status": "WAITING",
        "typeDelivery": "PICKUP",
        "typePay": "MONEY",
        "user": {
          "cellphone": "string",
          "email": "string",
          "id": 0,
          "name": "string",
          "typeLogin": "DEFAULT"
        }
      }
    ]
  
}