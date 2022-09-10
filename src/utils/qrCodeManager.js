import qrcode from 'qrcodeGenerator'
import pixInterface from 'pixInterface.js'
// 000201
// 2658
//  0014br.gov.bcb.pix
//  0136123e4567-e12b-12d1-a456-426655440000
// 52040000
// 5303986
// 5802BR
// 5913Fulano de Tal
// 6008BRASILIA
// 6207
//  0503***
// 63041D3D


jsonExample = {
    "calendario": {
      "criacao": "2020-09-09T20:15:00.358Z",
      "dataDeVencimento": "2020-12-31",
      "validadeAposVencimento": 30
    },
    "txid": "7978c0c97ea847e78e8849634473c1f1",
    "revisao": 0,
    "status": "ATIVA",
    "devedor": {
      "logradouro": "Rua 15, Numero 1, Bairro Luz",
      "cidade": "Belo Horizonte",
      "uf": "MG",
      "cep": "99000750",
      "cnpj": "12345678000195",
      "nome": "Empresa de Serviços SA"
    },
    "recebedor": {
      "logradouro": "Rua 15 Numero 1200, Bairro São Luiz",
      "cidade": "São Paulo",
      "uf": "SP",
      "cep": "70800100",
      "cnpj": "56989000019533",
      "nome": "Empresa de Logística SA"
    },
    "valor": {
      "original": "567.89"
    },
    "chave": "a1f4102e-a446-4a57-bcce-6fa48899c1d1",
    "solicitacaoPagador": "Informar cartão fidelidade"
  }
  
export default {
    defaultKeys : ['address','message','test'],

    generate:{
        pixString:(json) => {
            let stringArr = []
            this.defaultKeys.each((key) => {stringArr.concat(json[key])})
            return stringArr
        },
        pixImage:(json)=>{            
            data = this.pixString(json)
            const typeNumber = 4;
            const errorCorrectionLevel = 'L';
            let qr = qrcode(typeNumber, errorCorrectionLevel);
            qr.addData(data);
            qr.make();
            return qr.createImgTag();
            // to use might eb:
            //document.getElementById('placeHolder').innerHTML = qrCodeManager.generate(json)
        }
    }
}


