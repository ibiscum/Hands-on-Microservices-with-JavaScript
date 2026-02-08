import { join } from 'path';
import { connect } from './db/index.js';
import app from './app.js';
import { createConfig } from './config/config.js';

async function execute() {
    const configPath = join(import.meta.dirname, '../configs/.env');
    const appConfig = createConfig(configPath);

    await connect(appConfig);
    const server = app.listen(appConfig.port, () => {
        console.log(`Server is running on port ${appConfig.port}`);
    });

    const closeServer = () => {
        if (server) {
            server.close(() => {
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    };

    const unexpectedError = (error) => {
        console.error('Unexpected error', error);
        closeServer();
    };

    process.on('uncaughtException', unexpectedError);
    process.on('unhandledRejection', unexpectedError);
}

execute();
