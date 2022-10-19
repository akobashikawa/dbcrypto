const crypto = require("crypto");

const cryptoService = {

    create() {
        const obj = Object.create(this);
        return obj;
    },

    generateKeys() {
        const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
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
              passphrase: "",
            },
          });
        return {publicKey, privateKey};
    },

    
};

module.exports = cryptoService;