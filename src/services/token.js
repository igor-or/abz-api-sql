const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const storageData = require('../../data/storage.json');

module.exports = class Token {
    #key = 'somesupersecretsecretkey';
    #expirationTme = '40m';
    #token;
    #payload;

    constructor(token) {
        if (token) {
            this.#token = token;
            this.#decode();
            return;
        }

        this.#deleteAllExpiredUsed();
        this.#token = jwt.sign({}, this.#key, {
            expiresIn: this.#expirationTme,
        });
    }

    get value() {
        return this.#token;
    }

    get isValid() {
        if (this.#isUsed() || !this.#payload) {
            return false;
        }
        return true;
    }

    invalidate() {
        storageData.usedTokens.push({
            token: this.#token,
            exp: this.#payload.exp,
        });
        this.#saveToStorage();
    }

    #decode() {
        jwt.verify(this.#token, this.#key, (err, payload) => {
            if (err) {
                this.#payload = null;
                return
            }
            this.#payload = payload;
        });
    }

    #isUsed() {
        return storageData.usedTokens.some(
            token => token.token === this.#token
        );
    }

    #deleteAllExpiredUsed() {
        storageData.usedTokens = storageData.usedTokens.filter(token => {
            return new Date(token.exp * 1000) > new Date();
        });
        this.#saveToStorage();
    }

    async #saveToStorage() {
        try {
            fs.writeFileSync(
                path.join(__dirname, '..', '..', 'data', 'storage.json'),
                JSON.stringify(storageData, null, 2),
                {
                    encoding: 'utf-8',
                }
            );
        } catch (error) {
            console.log(error);
        }
    }
};
