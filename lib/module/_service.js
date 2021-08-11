const connection = require('../config/database');
const responseHandler = require('../helper/responseHandler');
const responseStatus = require('../helper/constant');
{{#mongodb}}const Users = require('../models/users.model');{{/mongodb}}


class {{classifyName}}Service{

   get()
   {
      console.log('getService');
      return new Promise(function(resolve){
         try {
            {{#mysql}}
            let sql = `SELECT * FROM users`;
            connection.query(sql, (error, results) => {
               if (error) { resolve(responseHandler.error(responseStatus.databaseError, error)) }

               (results && results.length > 0) ? resolve(responseHandler.success(responseStatus.success, 'Data retrieved successfully', results)) : resolve(responseHandler.error(error, responseStatus.noData, 'No data found'))
            })        
            {{/mysql}}
            {{#mongodb}}
            Users.find(function (error, result) {
               if (error) { resolve(responseHandler.error(error, responseStatus.databaseError)) }

               (result && result.length > 0) ? resolve(responseHandler.success(responseStatus.success, 'Data retrieved successfully', result)) : resolve(responseHandler.error(error, responseStatus.noData, 'No data found'))
            })       
            {{/mongodb}}
            {{#postgresql}}
                let sql = `SELECT * FROM users`;
                connection.query(sql, (error, results) => {
                    if (error) { resolve(responseHandler.error(responseStatus.databaseError, error)) }

                    (results && results.rows && results.rows.length > 0) ? resolve(responseHandler.success(responseStatus.success, 'Data retrieved successfully', results.rows)) : resolve(responseHandler.error(error, responseStatus.noData, 'No data found'))
                })
            {{/postgresql}}
         } catch (error) {
            console.log('getService : error ',error);
            resolve(responseHandler.error(error))
       }
      })
   }

   getById(id)
   {
      console.log('getByIdService');
      return new Promise(function(resolve){
         try {
            {{#mysql}}
            let sql = `SELECT * FROM users WHERE id ='` + id + `'`;
            connection.query(sql, (error, results) => {
               if (error) { resolve(responseHandler.error(error, responseStatus.databaseError)) }

               (results && results.length > 0) ? resolve(responseHandler.success(responseStatus.success, 'Data retrieved successfully', results)) : resolve(responseHandler.error(error, responseStatus.noData, 'No data found'))
            })
            {{/mysql}}
            {{#mongodb}}
            Users.findById(id, function (error, result) {
               if (error) { resolve(responseHandler.error(error, responseStatus.databaseError)) }

               (result && Object.keys(result).length > 0) ? resolve(responseHandler.success(responseStatus.success, 'Data retrieved successfully', result)) : resolve(responseHandler.error(error, responseStatus.noData, 'No data found'))
            })        
            {{/mongodb}}
            {{#postgresql}}
                let sql = `SELECT * FROM users WHERE id ='` + id + `'`;
                connection.query(sql, (error, results) => {
                    if (error) { resolve(responseHandler.error(error, responseStatus.databaseError)) }

                    (results && results.rows && results.rows.length > 0) ? resolve(responseHandler.success(responseStatus.success, 'Data retrieved successfully', results.rows)) : resolve(responseHandler.error(error, responseStatus.noData, 'No data found'))
                })
            {{/postgresql}}
            } catch (error) {
            console.log('getByIdService : error ',error);
            resolve(responseHandler.error(error))
         }
      })
   }

   create(data)
   {
      console.log('createService');
      return new Promise(function(resolve){
         try {
            {{#mysql}}
            const newData = {
               name: data.name
            }
            let sql = `INSERT INTO users(name) VALUES(?)`;
            connection.query(sql, [newData.name], (error, results) => {
               if (error) { resolve(responseHandler.error(error, responseStatus.databaseError)) }

               results && results.insertId !== 0 ? resolve(responseHandler.success(responseStatus.success, 'Data created successfully', { id: results.insertId, ...newData })) : resolve(responseHandler.error(error, responseStatus.noData, 'No data found'))
            })
            {{/mysql}}
            {{#mongodb}}
            var userData = new Users(data);

            userData.save(function (error, result) {
               if (error) { resolve(responseHandler.error(error, responseStatus.databaseError)) }

               (result) ? resolve(responseHandler.success(responseStatus.success, 'Data created successfully', result)) : resolve(responseHandler.error(error, responseStatus.noData, 'No data found'))
            })       
            {{/mongodb}}
            {{#postgresql}}
                const newData = {
                    name: data.name
                }
                let sql = `INSERT INTO users(name) VALUES($1)`;
                connection.query(sql,[newData.name], (error, results) => {
                    if (error) { resolve(responseHandler.error(error, responseStatus.databaseError)) }

                    results && results.rowCount === 1 ? resolve(responseHandler.success(responseStatus.success, 'Data created successfully', {  ...newData })) : resolve(responseHandler.error(error, responseStatus.noData, 'No data found'))
                })
            {{/postgresql}}
         } catch (error) {
            console.log('createService : error ',error);
            resolve(responseHandler.error(error))
         }
      })
   }

   update(id,data)
   {
      console.log('updateService');
      return new Promise(function(resolve){
         try {
            {{#mysql}}
            let sql = `UPDATE users SET name = ? WHERE id = ?`;
            connection.query(sql, [data.name, id], (error, results) => {
               if (error) { resolve(responseHandler.error(error, responseStatus.databaseError)) }

               (results && results.affectedRows === 1) ? resolve(responseHandler.success(responseStatus.success, 'Data updated successfully', results.affectedRows)) : resolve(responseHandler.error(error, responseStatus.noData, 'No data found'))
            })
            {{/mysql}}
            {{#mongodb}}
            Users.findByIdAndUpdate(id, data, {new: true}, function (error, result) {
               if (error) { resolve(responseHandler.error(error, responseStatus.databaseError)) }

               (result) ? resolve(responseHandler.success(responseStatus.success, 'Data updated successfully', result)) : resolve(responseHandler.error(error, responseStatus.noData, 'No data found'))
            })       
            {{/mongodb}}
            {{#postgresql}}
                let sql = `UPDATE users SET name = $1 WHERE id =$2`;
                connection.query(sql, [data.name, id], (error, results) => {
                    if (error) { resolve(responseHandler.error(error, responseStatus.databaseError)) }

                    (results && results.rowCount === 1) ? resolve(responseHandler.success(responseStatus.success, 'Data updated successfully', results.rowCount)) : resolve(responseHandler.error(error, responseStatus.noData, 'No data found'))
                })
            {{/postgresql}}
            } catch (error) {
            console.log('updateService : error ',error);
            resolve(responseHandler.error(error))
         }
      })
   }

   delete(id)
   {
      console.log('deleteService');
      return new Promise(function(resolve){
         try {
            {{#mysql}}
            let sql = `DELETE FROM users WHERE id = ?`;
            connection.query(sql, [id], (error, results) => {
               if (error) { resolve(responseHandler.error(error, responseStatus.databaseError)) }

               (results && results.affectedRows === 1) ? resolve(responseHandler.success(responseStatus.success, 'Data deleted successfully', results.affectedRows)) : resolve(responseHandler.error(error, responseStatus.noData, 'No data found'))
            })
            {{/mysql}}
            {{#mongodb}}
            Users.findOneAndDelete({'_id' : id}, function (error, result) {
               if (error) { resolve(responseHandler.error(error, responseStatus.databaseError)) }

               (result) ? resolve(responseHandler.success(responseStatus.success, 'Data deleted successfully', result)) : resolve(responseHandler.error(error, responseStatus.noData, 'No data found'))
            })       
            {{/mongodb}}
            {{#postgresql}}
                let sql = `DELETE FROM users WHERE id = $1`;
                connection.query(sql, [id], (error, results) => {
                    if (error) { resolve(responseHandler.error(error, responseStatus.databaseError)) }

                    (results && results.rowCount === 1) ? resolve(responseHandler.success(responseStatus.success, 'Data deleted successfully', results.rowCount)) : resolve(responseHandler.error(error, responseStatus.noData, 'No data found'))
                })
            {{/postgresql}}
            } catch (error) {
            console.log('deleteService : error ',error);
            resolve(responseHandler.error(error))
         }
      })
   }
}

module.exports = {{classifyName}}Service
