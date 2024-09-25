export const addProductValidator : any = {
     limit : {
         in : ['query'],
         isLength :{
            options : {
                min : 2 , 
                max : 10
            } , 
            errorMessage : "value for name must between 2 and 10"
        } ,
         notEmpty : {
             errorMessage : 'Limit is required'
         }
     },
     pages : {
         in : ['query'],
         notEmpty : {
             errorMessage : 'Pages is required'
         }
        }
}