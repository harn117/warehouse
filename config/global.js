export default  {
    TOKEN_SECRET: process.env.TOKEN_SECRET || "9JsvJqfMmVFvSmcNB1A8KdU44RS+aSymhfLtgj7pJIIE79t4G6tS1cOyFFAuasVY5tFuQbKotBlbe7Gk5bJ7U73tiix/qqFzKKAWDgwjXCtgIgWQKBsz6i+6MRJ8td95wD0u8ljq19FqOXGYOXl6EVOM4sbwKdNybwTSrUhmDDse9dymb65z3Iah0Wtq+7RUywreB5PJFm83aS1XhC30Tg1qL0u4Dms9xVnS1iqlP2oCjfI09myM2XqVcRIFqiJeand8wCM8CEo9vBEaz6gRGo+di/6553GH9WytszcU45APp24d/Cfv2uhbOEtRHq+pcAkMuo3Bj3YzRPej3xMv4g==",
    URL : process.env.URL || "localhost",
    PORT : process.env.PORT || "3700",
    PGHOST: process.env.PORT || "localhost",
    PGUSER: process.env.PGUSER || "postgres",
    PGDATABASE: process.env.PGDATABASE || "datawarehause",
    PGPASSWORD: process.env.PGPASSWORD || "postgres",
    PGPORT: process.env.PGPORT || 5432,
    PRODUCTION :  (process.env.PRODUCTION == false),
    PROJECT_PATH : process.env.PROJECT_PATH || "/home/api/",
    PASS_ADMIN : process.env.PASS_ADMIN || "",
    PREFIX : process.env.KUBE_PREFIX || "/v1"
}