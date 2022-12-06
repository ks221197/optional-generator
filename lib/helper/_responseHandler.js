{{#es}}export {{/es}}function success(status{{#ts}}:any{{/ts}}=200,message{{#ts}}:any{{/ts}},data{{#ts}}:any{{/ts}}){
        return {status,message,data}
    }
{{#es}}export {{/es}}function error(error{{#ts}}:any{{/ts}},status{{#ts}}:any{{/ts}}=111,message{{#ts}}:any{{/ts}}="Some error generated!"){
        return {status,message,error}
    }


{{^es}}module.exports = {success,error}{{/es}}
