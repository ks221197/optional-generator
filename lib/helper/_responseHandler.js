function success(status=200,message,data){
        return {status,message,data}
    }
function error(error,status=111,message="Some error generated!"){
        return {status,message,error}
    }


module.exports = {success,error}
