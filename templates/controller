const responseHandler = require('../helper/responseHandler');
const {{constName}}Service = require('../services/{{fileName}}.service');
const {{fileName}}Service=new {{constName}}Service(); 

class {{constName}}Controller{

    async get()
    {
        console.log('getController');
        try {
            const getAll{{constName}}=await {{fileName}}Service.get();
            return getAll{{constName}};
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
            const get{{constName}}ById=await {{fileName}}Service.getById(id);
            return get{{constName}}ById;
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
            const created{{constName}}=await {{fileName}}Service.create(data);
            return created{{constName}};
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
            const updated{{constName}}=await {{fileName}}Service.update(id,data);
            return updated{{constName}};
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
            const deleted{{constName}}=await {{fileName}}Service.delete(id);
            return deleted{{constName}};
        } catch (error) {
            console.log('deleteController - error',error);
            console.log(error);
            return responseHandler.error(error)
        }
    }

}

module.exports = {{constName}}Controller
