import { stringfy, nullable } from "../converter"

describe("todas las funciones de converter.js", () =>{
    describe("stringfy utils", () =>{
        it("Devuelve undefined si no recibe parametros ", () =>{
            expect(stringfy()).toBeUndefined();
        });
        it("convierte a string el parametro", () =>{
            expect(stringfy("hola")).toBe("hola");
        });
    })

    describe("nullable utils", () =>{
        it("devuelve null si el valor null", () =>{
            expect(nullable()).toBeNull();
        });
        it("devuelve null si recibe undefined", () =>{
            expect(nullable(undefined)).toBeNull();
        });
        
        it("devuelve null si recibe un string vacio", () =>{
            expect(nullable("")).toBeNull();
        });
        it("devuelve string si recibe un resultado", () =>{
            expect(nullable(84)).toBe("84");

        });
    });
});