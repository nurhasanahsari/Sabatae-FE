import cryptoJS from 'crypto-js';

export const encodeData = (data) => {
    if (!data) return null;
    const encrypted = cryptoJS.AES.encrypt(JSON.stringify(data), `${import.meta.env.REACT_SECRET_KEY}`).toString();
    return encrypted;
};

export const decryptData = (data) => {
    if (!data) return null;
    const decoded = cryptoJS.AES.decrypt(data, `${import.meta.env.REACT_SECRET_KEY}`);
    if (decoded.sigBytes === 0) return null;
    const decrypted = JSON.parse(decoded.toString(cryptoJS.enc.Utf8));
    return decrypted;
};

export const base64 = {
    encodeData,
    decryptData
};

export default base64;
