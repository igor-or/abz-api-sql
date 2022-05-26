const Server = require('./server');
const config = require('./config');

(async () => {
    const server = await Server.build();
    server.run(config.PORT);
})();
