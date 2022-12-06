const config{{#ts}}:any{{/ts}} = {
    "local": {
        port: 3000,
        db: {
            {{#mysql}}
            host: "localhost",
            user: "root",
            password: "",
            database: "boilerplate"
            {{/mysql}}
            {{#mongodb}}
            connectionString: 'mongodb://localhost/boilerplate'
            {{/mongodb}}
            {{#postgresql}}
            user: 'postgres',
            host: 'localhost',
            database: 'boilerplate',
            password: 'postgres',
            port: 5432
            {{/postgresql}}
        }
    }
};

{{^es}}
module.exports = config;
{{/es}}
{{#es}}
export default config;
{{/es}}
