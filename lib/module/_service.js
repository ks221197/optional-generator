const connection = require('../config/database');
const responseHandler = require('../helper/responseHandler');
const responseStatus = require('../helper/constant');
{{#mongodb}}const {{database.tblName}} = require('../models/users.model');{{/mongodb}}{{#mysql}}const {executeQuery} = require('../config/database');{{/mysql}}

class {{classifyName}}Service{
   async get()
   {
      console.log('getService');
         try {
            {{#mysql}}
            let sql = `SELECT * FROM {{database.tblName}}`;
            const results = await executeQuery(sql);
            if (results && results.length > 0) return (responseHandler.success(responseStatus.success, 'Data retrieved successfully', results));
            return (responseHandler.error([], responseStatus.noData, 'No data found'))
            {{/mysql}}
            {{#mongodb}}
            const result = await {{database.tblName}}.find();
            return (result && result.length > 0) ? (responseHandler.success(responseStatus.success, 'Data retrieved successfully', result)) : (responseHandler.error([], responseStatus.noData, 'No data found'))    
            {{/mongodb}}
            {{#postgresql}}
            let sql = `SELECT * FROM {{database.tblName}}`;
            const results = await connection.query(sql)
            return (results && results.rows && results.rows.length > 0) ? (responseHandler.success(responseStatus.success, 'Data retrieved successfully', results.rows)) : (responseHandler.error([], responseStatus.noData, 'No data found'))   
            {{/postgresql}}
         } catch (error) {
            console.log('getService : error ',error);
            return(responseHandler.error(error))
       }
   }

   async getById({{database.primaryKey}})
   {
      console.log('getByIdService');
         try {
            {{#mysql}}
            let sql = `SELECT * FROM {{database.tblName}} WHERE {{database.primaryKey}} =?`;
            const results = await executeQuery(sql, {{database.primaryKey}})
            if (results && results.length > 0) return (responseHandler.success(responseStatus.success, 'Data retrieved successfully', results))
            return (responseHandler.error([], responseStatus.noData, 'No data found'))
            {{/mysql}}
            {{#mongodb}}
            const result = await {{database.tblName}}.findById({{database.primaryKey}})
            return (result && Object.keys(result).length > 0) ? (responseHandler.success(responseStatus.success, 'Data retrieved successfully', result)) : (responseHandler.error([], responseStatus.noData, 'No data found'))
            {{/mongodb}}
            {{#postgresql}}
            let sql = `SELECT * FROM {{database.tblName}} WHERE {{database.primaryKey}} ='` + {{database.primaryKey}} + `'`;
            const results = await connection.query(sql)
            return (results && results.rows && results.rows.length > 0) ? (responseHandler.success(responseStatus.success, 'Data retrieved successfully', results.rows)) : (responseHandler.error([], responseStatus.noData, 'No data found'))   
            {{/postgresql}}
            } catch (error) {
            console.log('getByIdService : error ',error);
            return(responseHandler.error(error))
         }
   }

   async create(data)
   {
      console.log('createService');
         try {
            {{#mysql}}
            const { {{database.column}} } = data
            let sql = `INSERT INTO {{database.tblName}}({{database.column}}) VALUES({{database.value}})`;
            const results = await executeQuery(sql, [{{database.column}}])
            if (results && results.insertId !== 0) return (responseHandler.success(responseStatus.success, 'Data created successfully', { {{database.primaryKey}}: results.insertId, {{database.column}} }))
            return (responseHandler.error([], responseStatus.noData, 'No data found'))   
            {{/mysql}}
            {{#mongodb}}
            var userData = new {{database.tblName}}(data);
            const result = await userData.save()
            return (result) ? (responseHandler.success(responseStatus.success, 'Data created successfully', result)) : (responseHandler.error([], responseStatus.noData, 'No data found'))
            {{/mongodb}}
            {{#postgresql}}
            const { {{database.column}} } = data
            let sql = `INSERT INTO {{database.tblName}}({{database.column}}) VALUES({{database.value}})`;
            const results = await connection.query(sql, [{{database.column}}])
            return results && results.rowCount === 1 ? (responseHandler.success(responseStatus.success, 'Data created successfully', { data })) : (responseHandler.error([], responseStatus.noData, 'No data found'))   
            {{/postgresql}}
         } catch (error) {
            console.log('createService : error ',error);
            return(responseHandler.error(error))
         }
   }

   async update({{database.primaryKey}},data)
   {
      console.log('updateService');
         try {
            {{#mysql}}
            let sql = `UPDATE {{database.tblName}} SET {{database.updateValue}} WHERE {{database.primaryKey}} = ?`;
            const results = await executeQuery(sql, [{{database.column}}, {{database.primaryKey}}])
            if (results && results.affectedRows === 1) return (responseHandler.success(responseStatus.success, 'Data updated successfully', results.affectedRows))
            return (responseHandler.error([], responseStatus.noData, 'No data found'))
            {{/mysql}}
            {{#mongodb}}
            const result = await {{database.tblName}}.findByIdAndUpdate({{database.primaryKey}}, data, { new: true })
            return (result) ? (responseHandler.success(responseStatus.success, 'Data updated successfully', result)) : (responseHandler.error([], responseStatus.noData, 'No data found'))
            {{/mongodb}}
            {{#postgresql}}
            let sql = `UPDATE {{database.tblName}} SET {{database.updateValue}} WHERE {{database.primaryKey}} =$1`;
            const results = await connection.query(sql, [{{database.primaryKey}},{{database.column}} ])
            return (results && results.rowCount === 1) ? (responseHandler.success(responseStatus.success, 'Data updated successfully', results.rowCount)) : (responseHandler.error([], responseStatus.noData, 'No data found'))
            {{/postgresql}}
            } catch (error) {
            console.log('updateService : error ',error);
            return(responseHandler.error(error))
         }
   }

      async delete({{database.primaryKey}})
   {
      console.log('deleteService');
         try {
            {{#mysql}}
            let sql = `DELETE FROM {{database.tblName}} WHERE {{database.primaryKey}} = ?`;
            const results = await executeQuery(sql, [{{database.primaryKey}}],)
            if (results && results.affectedRows === 1) return (responseHandler.success(responseStatus.success, 'Data deleted successfully', results.affectedRows))
            return (responseHandler.error([], responseStatus.noData, 'No data found'))   
            {{/mysql}}
            {{#mongodb}}
            const result = await {{database.tblName}}.findOneAndDelete({ '_id': {{database.primaryKey}} })
            return (result) ? (responseHandler.success(responseStatus.success, 'Data deleted successfully', result)) : (responseHandler.error([], responseStatus.noData, 'No data found'))
            {{/mongodb}}
            {{#postgresql}}
            let sql = `DELETE FROM {{database.tblName}} WHERE {{database.primaryKey}} = $1`;
            const results = await connection.query(sql, [{{database.primaryKey}}])
            return (results && results.rowCount === 1) ? (responseHandler.success(responseStatus.success, 'Data deleted successfully', results.rowCount)) : (responseHandler.error([], responseStatus.noData, 'No data found'))
            {{/postgresql}}
            } catch (error) {
            console.log('deleteService : error ',error);
            return(responseHandler.error(error))
         }
   }
}

module.exports = {{classifyName}}Service
