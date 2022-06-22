const app = require('./app');
const seeder = require('./seeders/seeder');

const sequelize = require('./db');

class Server {
    constructor() {
        this.app = app;
    }

    static async build() {
        await this.#setup();
        return new Server();
    }

    static async #setup() {
        await sequelize.sync();
        await seeder.ensurePopulated();
    }

    run(port) {
        this.server = this.app.listen(port, () => {
            console.log(`API is listening on port ${port}`);
        });
    }

    stop(done) {
        this.server.close(done);
    }
}

module.exports = Server;
