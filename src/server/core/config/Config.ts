import path = require("path");

export class Config
{
    private static rootPath = path.normalize(__dirname + "/../..");

    private static appConfig = {
        development: {
            rootPath: Config.rootPath,
            port: process.env.PORT || 47540,
            cors: {
                origin: "http://localhost:47560",
                credentials: true 
            }
        },
        production: {
            rootPath: Config.rootPath,
            port: 80,
            cors: {
                origin: "http://localhost:47560",
                credentials: true
            }
        }
    };

    public static current;

    public static init(env)
    {
        Config.current = Config.appConfig[env];
    }
}