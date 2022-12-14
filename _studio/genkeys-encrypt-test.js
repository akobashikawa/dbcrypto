const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

function encrypt(toEncrypt, relativeOrAbsolutePathToPublicKey) {
  const absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
  const publicKey = fs.readFileSync(absolutePath, "utf8");
  const buffer = Buffer.from(toEncrypt, "utf8");
  const encrypted = crypto.publicEncrypt(publicKey, buffer);
  return encrypted.toString("base64");
}

function encrypt2(toEncrypt, publicKey) {
  const buffer = Buffer.from(toEncrypt, "utf8");
  const encrypted = crypto.publicEncrypt(publicKey, buffer);
  return encrypted.toString("base64");
}

function decrypt(toDecrypt, relativeOrAbsolutePathtoPrivateKey) {
  const absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey);
  const privateKey = fs.readFileSync(absolutePath, "utf8");
  const buffer = Buffer.from(toDecrypt, "base64");
  const decrypted = crypto.privateDecrypt(
    {
      key: privateKey.toString(),
      passphrase: "",
    },
    buffer
  );
  return decrypted.toString("utf8");
}

function decrypt2(toDecrypt, privateKey) {
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

// const enc = encrypt("hello", `rsa_4096_pub.pem`);
// console.log("enc", enc);

// const publicKey = `-----BEGIN PUBLIC KEY-----
// MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAx1VGKITGcWh7HzbPQza6
// RZGEEDh5PO6jVxp7Mu8a9xSnvZ67LWma6wpZeDS5l4lJObMgv0Uuxs+rqNRGWBwI
// ESN1dDjCNiLe4BSB7iIIb5j7/S87ChxnrKisKFO2QNGT8eFkJmmfH0mCxufCta+P
// m3NObcLLA31V57bdAuAalCSvJOjXQ0Y+GJeXayKJxVCj8CILg5pcHGl7COwiqFR1
// 3GtPLoSKmXQX06VJlqnzo7uc3UiIu8yy4ot4F9TeH3+22Szm1EA2z63zzkLwHkdP
// tCRXwtmilG5zRU0GTCB1hH2NFIUhuPMWxDiXCSRcHgGRg8ZOqL8AMipKP9ngcBMR
// CEbfnEvYHWRZwqZEtIpKt02bgLo1nbKLLWUBZs+ioNXX+cm0EghIAQNYlm+mGa87
// ILnPd401p8vCWyClUx0fkb0p3sTYa7YllgWjjsNb2cbAQuhvlHVQAmEo+E5RT+yX
// 52/fx5y2dA/o98hLQrod41+8QKa9pHq45a4ZRTl12rCW/hh0AQhkJJgWlDpqT1H+
// iIRHQHCIGAgfB/3ylIBvxltl2K6EL/WCsqOs0A/1gN4W1czXpDTkVlJZyO3/mpYv
// ++3h0RM+WvBBjkCgPBMXUKKQvHwJ7SR2febV9i2u6x0YiYhBuZjt2Es4ep18728L
// PY8OGcUx4AMJEbK5KsKtI4UCAwEAAQ==
// -----END PUBLIC KEY-----`;

// const privateKey = `-----BEGIN RSA PRIVATE KEY-----
// MIIJKAIBAAKCAgEAx1VGKITGcWh7HzbPQza6RZGEEDh5PO6jVxp7Mu8a9xSnvZ67
// LWma6wpZeDS5l4lJObMgv0Uuxs+rqNRGWBwIESN1dDjCNiLe4BSB7iIIb5j7/S87
// ChxnrKisKFO2QNGT8eFkJmmfH0mCxufCta+Pm3NObcLLA31V57bdAuAalCSvJOjX
// Q0Y+GJeXayKJxVCj8CILg5pcHGl7COwiqFR13GtPLoSKmXQX06VJlqnzo7uc3UiI
// u8yy4ot4F9TeH3+22Szm1EA2z63zzkLwHkdPtCRXwtmilG5zRU0GTCB1hH2NFIUh
// uPMWxDiXCSRcHgGRg8ZOqL8AMipKP9ngcBMRCEbfnEvYHWRZwqZEtIpKt02bgLo1
// nbKLLWUBZs+ioNXX+cm0EghIAQNYlm+mGa87ILnPd401p8vCWyClUx0fkb0p3sTY
// a7YllgWjjsNb2cbAQuhvlHVQAmEo+E5RT+yX52/fx5y2dA/o98hLQrod41+8QKa9
// pHq45a4ZRTl12rCW/hh0AQhkJJgWlDpqT1H+iIRHQHCIGAgfB/3ylIBvxltl2K6E
// L/WCsqOs0A/1gN4W1czXpDTkVlJZyO3/mpYv++3h0RM+WvBBjkCgPBMXUKKQvHwJ
// 7SR2febV9i2u6x0YiYhBuZjt2Es4ep18728LPY8OGcUx4AMJEbK5KsKtI4UCAwEA
// AQKCAgBapZnJFVBVBGlxMXChpUKiHmGLKtNfdTpMgxthd0Cw+fCqF4QRS8QKfONg
// +cEoe2MUXTRYJvL1sDzlAtuWd/DnMlPYbXNMQSFPj6PikhF6Bn0Zjx/vIim3Z+Ea
// Wa843NXFmnT7zu5wwPI61+xAyTyqOY6B9aJyzM2DGTJ6e0U690+6njQ+QLQ+ZLmU
// G9nBJEHZEvJff5PBy+oKja/ZEseiXB5fDiElVZj8Q18qp9DHNatJKhIcLSNwSHJt
// i/0TH/Yb3wJ9pVIHsZh8xQ4DBvTk+935GxWHII9FBZkGh4BJpvrASSajv9ArnXx5
// yNInRxlQbp8Yt/sz1O19Cey5qsIETxlqDxga+Nwx8tlDmnHnsx7I+UgonGKNYc06
// cZSA0mFF7mMmz7uHdlhJ5DKAIjy+8VBk6Or0yQgyV/nxHwXYfWMzVUCRWNFzkPwS
// YzGTQeQHVfnz6/gd1QvW56VjQZ1rux7SMwVZpfnwNOIXe/44sdXTapeKVAx4ZXuC
// AnEDi97/IG5zcqVNccdpdGEwFldvfh5qOyanzb86kDf2PcrQdFv2Yx5+7X8ODNUq
// Xa7maUV3CXUEM+odguTkZyFowkM80mOuMuaOaERK2r4FMK4QBfEbF5TYYZRDC4Uk
// CL5FJn/n2F77Ihu4LiyB9CbHGiUZwtQ3qc95musEJkeX8Xg1JQKCAQEA4sC7WfOD
// rAMjSmZozAKl8tQUumxVpK6qVGaH+uWFDY8igqVzoMU08K+TOVPM3XDkx+5VV0HJ
// 3V800q7d3jar+3vC/Tm2Hs9PkgpGUu6elobOv1OFVRaUnXzQRs57g9VBabN1BjBy
// KjMmudQ001tR95grjERlY4p0G9y3kh3mYQCmak+E4G7YmHMF66T7lP7FfZrOpNqK
// Pj+J2Yr4h/1ZA9VStXzq1QJQ7NBAWnht+R142WnteWQbmUXACggH0R4vBoI1qrZL
// XE3BL5KIQ0FHHqi7ecy6cyFo02qlXT+AJI23lOh25CDcaGoYHWha5ng+ak8SIptz
// 0oVf+nvHT4MykwKCAQEA4QsnwRxFHroEGVSUz2NN+xOYSYuS3bkbaND70rHepD/w
// dP6LsDP1d8oSimuV3m9jNUEjpH6/lXDSPm4WIcGnuC65nvT89cHVJi67jnuFSb35
// a/g7brMqDM7vx5EHhtgpsQtIokLLqKzSVE4/+GOCDnN1Qw99gdMjtKXZyPR8OjG0
// g7RJbs76Lj1NN2jn9VFHpZoNBkcy7D+2W7NxsaQrDbTVlyHUP8+tbw7eqJWhjSUi
// PZ4g5MNlwenkEx4mmh7xJal04w7BACJUo19JzvdilQze7WagbEhSOmOmHH6oLu6Y
// dzYUzUqUo2HaMVLI8K4bT1WWJ+P8AQ8zGIY+pp+ohwKCAQABC35Rhcu/iSwqdZpa
// BlEZc1y9Fy612ZAzX12VDGW2kEhKbdTAkugRi92T0A0LoC+NtE10X3s8p+moZuHi
// 2kGkoQde/1sVfUMSmzWDwFG+w9REEXB12erJZv/Ws7DiBKOOhyMs6iA8jYvKI24y
// 4yLXjz30IYSOFt8+GaBG7hhXrhcWOlOUbS5WVYFbeqEmKJ5kW8hD/jXQ354VAIzw
// o3w7hkohR/gVDzOsQ7FoOVHYaghaiCBuBMYTyLx/z1Wp4we4cfUpWjmyrTEMtRIn
// rS9UttZWU1kwmqDPCJjGezpt8LE94Gxb1MLvQD3oNMjmcvtmpgKhYjIAcFjm4Jck
// iKg9AoIBADMUEBrhqsKVn/aL3xbPSFTTlr4iotwWdqUsweuJmaoYJSC44cXFlVJy
// GBE46BRLne3pcgiVCDEIIYAwBm/0/3dri5ALtRqmuxVmiAWH/bHGH8Wk2wB+Q+4S
// ThQy082EZLodgIfrt0P6reaauCRNmahkBlqJOohr/u+ysSLOcx/WRk2abwxqiBhU
// q6EG+5cPsr5gn9Ir+N/sehyINycFxwveXphmAkHVhlztuBX1mGxr4ECyEm859m+0
// AaNhNYvHuB4/PxuGLsI0CJfoOd1zAvonqLWjlIffRmKgWYSgLtYwK4TrTn9mDSSk
// Qhzt2FPggKxaFbHKKlmnNIa9eZziIiMCggEBAMFrIUQgewPauMn3WLKaEUzOhfjp
// LjUI9WwIHuW41mtVW6f629GEYBUXfOD796jumV4ECxDM0YUxFYWwNFKJklqLQNhT
// KlIPZxYbeJ3zrb/mbj66D8cKzZHeeYRws+4rcvNf3M1AguYK/EZsux+VW3BrHp3j
// TkxK2dcr8wP8Z59UAReE8emLWvpWhmeRPHrh6jqWVsFt8WdA0917xenGcgWR2E38
// t0Np95/3inhOLvhhN7u5jfYYpjuCGwV4+RxfDalRF8/oiXYVbLiXBmm7n6bFRAUH
// pnq9kCy6LCu0LxX1zvajdIhbW41w7JtgkH8q1Tp2QwIABBT3EnWd8/hveHk=
// -----END RSA PRIVATE KEY-----`;

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
    passphrase: "passphrase",
  },
});

// const enc2 = encrypt2("hello", `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`);
const enc2 = encrypt2("hello", publicKey);
console.log("enc2", enc2);

// const dec = decrypt(enc, `rsa_4096_priv.pem`);
// console.log("dec", dec);

// const dec2 = decrypt2(enc2, `-----BEGIN RSA PRIVATE KEY-----\n${privateKey}\n-----END RSA PRIVATE KEY-----`);
const dec2 = decrypt2(enc2, privateKey);
console.log("dec2", dec2);
