// INFO

// https://es.acervolima.com/node-js-metodo-crypto-generatekeypair/
console.log('Genkeys');

// LIB
const crypto = require('crypto');

const print = (obj) => obj.toString('hex');

const generateKeyPair = () => new Promise((resolve, reject) => {

    const type = 'rsa';
    const options = {
        modulusLength: 4096,
        namedCurve: 'secp256k1',
        publicKeyEncoding: {
          type: "spki",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs8",
          format: "pem",
          cipher: "aes-256-cbc",
          passphrase: "passphrase",
        },
    };

    // const type = 'rsa';
    // const options = {
    //     modulusLength: 530,
    //     publicExponent: 0x10101,
    //     publicKeyEncoding: {
    //         type: 'pkcs1',
    //         format: 'der'
    //     },
    //     privateKeyEncoding: {
    //         type: 'pkcs8',
    //         format: 'der',
    //         cipher: 'aes-192-cbc',
    //         passphrase: 'secret'
    //     }
    // };

    // const type = 'ec';
    // const options = {
    //     namedCurve: 'secp256k1',
    //     publicKeyEncoding: {
    //         type: 'spki',
    //         format: 'der'
    //     },
    //     privateKeyEncoding: {
    //         type: 'pkcs8',
    //         format: 'der'
    //     }
    // };

    crypto.generateKeyPair( type, options, (err, publicKey, privateKey) => {
        if (err) {
            console.log(err);
            reject(err);
        }
        // console.log("Type:" + type);
        // console.log("Public key:\n" + print(publicKey));
        // console.log("Private key:\n" + print(privateKey));
        resolve({publicKey: print(publicKey), privateKey: print(privateKey)});
    });
});

const publicEncrypt = (toEncrypt, publicKey) => {
    const buffer = Buffer.from(toEncrypt, "utf8");
    const encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString("base64");
};

function privateDecrypt(toDecrypt, privateKey) {
    const buffer = Buffer.from(toDecrypt, "base64");
    const decrypted = crypto.privateDecrypt(
      {
        key: privateKey.toString(),
        passphrase: "passphrase",
      },
      buffer
    );
    return decrypted.toString("utf8");
  }

// MAIN

(async () => {

    try {

        const keys = await generateKeyPair();
        console.log(keys);

        const message = `Hola
Este es
un mensaje
secreto`;
        console.log("message:\n", message);

        const publicEncripted = publicEncrypt(message, keys.publicKey);
        console.log("publicEncripted:\n", publicEncripted);

        const privateDecrypted = privateDecrypt(publicEncripted, keys.privateKey);
        console.log("privateDecrypted:\n", privateDecrypted);

        
    } catch (error) {
        console.log(error);
    }




})();
