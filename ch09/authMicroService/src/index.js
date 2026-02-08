import { join } from 'path';
import { connect } from './db';
import { listen } from './app';
import { createConfig } from './config/config';

async function execute() {
    const configPath = join(import.meta.dirname, '../configs/.env');
    const appConfig = createConfig(configPath);

    await connect(appConfig);
    const server = listen(appConfig.port, () => {
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
