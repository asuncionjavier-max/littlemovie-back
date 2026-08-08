export const stringfy = (value) =>{
   
   return typeof value === "string" ? value : JSON.stringify(value);
};

export const nullable = (value) => {
   if(value === undefined || value === null || value === "") {
   return null
   }
   return String(value)

}