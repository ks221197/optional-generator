{{^es}}
const responseHandler = require('../helper/responseHandler');
const responseStatus = require('../helper/constant');
{{#mongodb}}const Users = require('../models/users.model');{{/mongodb}}{{#mysql}}const {executeQuery} = require('../config/database');{{/mysql}}{{#postgresql}}const {connection} = require('../config/database');{{/postgresql}}
{{/es}}
{{#es}}
import * as responseHandler from  '../helper/responseHandler';
import responseStatus from  '../helper/constant';
{{#mongodb}}import { usersModel as Users } from  '../models/users.model';{{/mongodb}}{{#mysql}}import {executeQuery} from  '../config/database';{{/mysql}}{{#postgresql}}import {connection}  from  '../config/database';{{/postgresql}}
{{#ts}}import { IUser } from '../interface/common.interface';{{/ts}}
{{/es}}

class {{classifyName}}Service{
   async get()
   {
      console.log('getService');
         try {
            {{#mysql}}
            let sql = `SELECT * FROM users`;
            const results = await executeQuery(sql);
            if (results && results.length > 0) return (responseHandler.success(responseStatus.success, 'Data retrieved successfully', results));
            return (responseHandler.error([], responseStatus.noData, 'No data found'))
            {{/mysql}}
            {{#mongodb}}
            const result = await Users.find();
            return (result && result.length > 0) ? (responseHandler.success(responseStatus.success, 'Data retrieved successfully', result)) : (responseHandler.error([], responseStatus.noData, 'No data found'))    
            {{/mongodb}}
            {{#postgresql}}
            let sql = `SELECT * FROM users`;
            const results = await connection.query(sql)
            return (results && results.rows && results.rows.length > 0) ? (responseHandler.success(responseStatus.success, 'Data retrieved successfully', results.rows)) : (responseHandler.error([], responseStatus.noData, 'No data found'))   
            {{/postgresql}}
         } catch (error) {
            console.log('getService : error ',error);
            return(responseHandler.error(error))
       }
   }

   async getById(id{{#ts}}:string{{/ts}})
   {
      console.log('getByIdService');
         try {
            {{#mysql}}
            let sql = `SELECT * FROM users WHERE id =?`;
            const results = await executeQuery(sql, id)
            if (results && results.length > 0) return (responseHandler.success(responseStatus.success, 'Data retrieved successfully', results))
            return (responseHandler.error([], responseStatus.noData, 'No data found'))
            {{/mysql}}
            {{#mongodb}}
            const result = await Users.findById(id)
            return (result && Object.keys(result).length > 0) ? (responseHandler.success(responseStatus.success, 'Data retrieved successfully', result)) : (responseHandler.error([], responseStatus.noData, 'No data found'))
            {{/mongodb}}
            {{#postgresql}}
            let sql = `SELECT * FROM users WHERE id ='` + id + `'`;
            const results = await connection.query(sql)
            return (results && results.rows && results.rows.length > 0) ? (responseHandler.success(responseStatus.success, 'Data retrieved successfully', results.rows)) : (responseHandler.error([], responseStatus.noData, 'No data found'))   
            {{/postgresql}}
            } catch (error) {
            console.log('getByIdService : error ',error);
            return(responseHandler.error(error))
         }
   }

   async create(data{{#ts}}:IUser{{/ts}})
   {
      console.log('createService');
         try {
            {{#mysql}}
            const { name } = data
            let sql = `INSERT INTO users(name) VALUES(?)`;
            const results = await executeQuery(sql, [name])
            if (results && results.insertId !== 0) return (responseHandler.success(responseStatus.success, 'Data created successfully', { id: results.insertId, name }))
            return (responseHandler.error([], responseStatus.noData, 'No data found'))   
            {{/mysql}}
            {{#mongodb}}
            var userData = new Users(data);
            const result = await userData.save()
            return (result) ? (responseHandler.success(responseStatus.success, 'Data created successfully', result)) : (responseHandler.error([], responseStatus.noData, 'No data found'))
            {{/mongodb}}
            {{#postgresql}}
            const newData = {
               name: data.name
            }
            let sql = `INSERT INTO users(name) VALUES($1)`;
            const results = await connection.query(sql, [newData.name])
            return results && results.rowCount === 1 ? (responseHandler.success(responseStatus.success, 'Data created successfully', { ...newData })) : (responseHandler.error([], responseStatus.noData, 'No data found'))   
            {{/postgresql}}
         } catch (error) {
            console.log('createService : error ',error);
            return(responseHandler.error(error))
         }
   }

   async update(id{{#ts}}:string{{/ts}},data{{#ts}}:IUser{{/ts}})
   {
      console.log('updateService');
         try {
            {{#mysql}}
            let sql = `UPDATE users SET name = ? WHERE id = ?`;
            const results = await executeQuery(sql, [data.name, id],)
            if (results && results.affectedRows === 1) return (responseHandler.success(responseStatus.success, 'Data updated successfully', results.affectedRows))
            return (responseHandler.error([], responseStatus.noData, 'No data found'))
            {{/mysql}}
            {{#mongodb}}
            const result = await Users.findByIdAndUpdate(id, data, { new: true })
            return (result) ? (responseHandler.success(responseStatus.success, 'Data updated successfully', result)) : (responseHandler.error([], responseStatus.noData, 'No data found'))
            {{/mongodb}}
            {{#postgresql}}
            let sql = `UPDATE users SET name = $1 WHERE id =$2`;
            const results = await connection.query(sql, [data.name, id])
            return (results && results.rowCount === 1) ? (responseHandler.success(responseStatus.success, 'Data updated successfully', results.rowCount)) : (responseHandler.error([], responseStatus.noData, 'No data found'))
            {{/postgresql}}
            } catch (error) {
            console.log('updateService : error ',error);
            return(responseHandler.error(error))
         }
   }

      async delete(id{{#ts}}:string{{/ts}})
   {
      console.log('deleteService');
         try {
            {{#mysql}}
            let sql = `DELETE FROM users WHERE id = ?`;
            const results = await executeQuery(sql, [id],)
            if (results && results.affectedRows === 1) return (responseHandler.success(responseStatus.success, 'Data deleted successfully', results.affectedRows))
            return (responseHandler.error([], responseStatus.noData, 'No data found'))   
            {{/mysql}}
            {{#mongodb}}
            const result = await Users.findOneAndDelete({ '_id': id })
            return (result) ? (responseHandler.success(responseStatus.success, 'Data deleted successfully', result)) : (responseHandler.error([], responseStatus.noData, 'No data found'))
            {{/mongodb}}
            {{#postgresql}}
            let sql = `DELETE FROM users WHERE id = $1`;
            const results = await connection.query(sql, [id])
            return (results && results.rowCount === 1) ? (responseHandler.success(responseStatus.success, 'Data deleted successfully', results.rowCount)) : (responseHandler.error([], responseStatus.noData, 'No data found'))
            {{/postgresql}}
            } catch (error) {
            console.log('deleteService : error ',error);
            return(responseHandler.error(error))
         }
   }
}

{{^es}}module.exports = {{classifyName}}Service{{/es}}{{#es}}export default {{classifyName}}Service{{/es}}
