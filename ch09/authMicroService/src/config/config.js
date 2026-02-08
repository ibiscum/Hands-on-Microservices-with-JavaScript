import { config } from 'dotenv';
import pkg from 'joi';
const { object, number, string } = pkg;

const envVarsSchema = object()
    .keys({
        PORT: number().default(3006),
        MONGODB_URL: string().required().description('Mongo DB url'),
        SECRET_ACCESS_TOKEN: string().hex().required(),
        SECRET_REFRESH_TOKEN: string().hex().required(),
    })
    .unknown();

export function createConfig(configPath) {
    config({ path: configPath });

    const { value: envVars, error } = envVarsSchema
        .prefs({ errors: { label: 'key' } })
        .validate(process.env);

    if (error) {
        throw new Error(`Config validation error: ${error.message}`);
    }

    return {
        port: envVars.PORT,
        mongo: {
            url: envVars.MONGODB_URL,
        },
        jwt: {
            access_token: envVars.SECRET_ACCESS_TOKEN,
            refresh_token: envVars.SECRET_REFRESH_TOKEN
        }
    };
}

// export default {
//     createConfig,
// };
