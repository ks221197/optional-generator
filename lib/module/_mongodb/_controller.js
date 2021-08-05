const responseHandler = require('../helper/responseHandler');
const {{classifyName}}Service = require('../services/{{camelizeName}}.service');
const {{camelizeName}}Service=new {{classifyName}}Service(); 

class {{classifyName}}Controller{

    async get()
    {
        console.log('getController');
        try {
            const getAll{{classifyName}}=await {{camelizeName}}Service.get();
            return getAll{{classifyName}};
        } 
        catch (error) {
            console.log('getController - error',error);
            console.log(error);
            return responseHandler.error(error)
        }
    }

    async getById(req)
    {
        console.log('getByIdController');
        try {
            const id=req.params.id;
            const get{{classifyName}}ById=await {{camelizeName}}Service.getById(id);
            return get{{classifyName}}ById;
        }
        catch (error) {
            console.log('getByIdController - error',error);
            console.log(error);
            return responseHandler.error(error)
        }
    }
    async create(req)
    {
        console.log('createController');
        try {
            const data=req.body;
            const created{{classifyName}}=await {{camelizeName}}Service.create(data);
            return created{{classifyName}};
        } catch (error) {
            console.log('createController - error',error);
            console.log(error);
            return responseHandler.error(error)
        }
    }
    async update(req)
    {
        console.log('updateController');
        try {
            const data=req.body;
            const id=req.params.id;
            const updated{{classifyName}}=await {{camelizeName}}Service.update(id,data);
            return updated{{classifyName}};
        } catch (error) {
            console.log('updateController - error',error);
            console.log(error);
            return responseHandler.error(error)
        }
    }
    async delete(req)
    {
        console.log('deleteController');
        try {
            const id=req.params.id;
            const deleted{{classifyName}}=await {{camelizeName}}Service.delete(id);
            return deleted{{classifyName}};
        } catch (error) {
            console.log('deleteController - error',error);
            console.log(error);
            return responseHandler.error(error)
        }
    }

}

module.exports = {{classifyName}}Controller
