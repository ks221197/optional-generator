export interface IConfig {
    port: number,
    db: {
        {{#mysql}}
        host: string,
        user: string,
        password: string,
        database: string
        {{/mysql}}
        {{#mongodb}}
        connectionString:string
        {{/mongodb}}
        {{#postgresql}}
        host: string,
        user: string,
        password: string,
        database: string,
        port: number
        {{/postgresql}}
    }
}

export interface IEnv {
    [key: string]: any
}


export interface IUser {
    name: string,
}