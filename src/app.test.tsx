import { fireEvent, getByRole, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";


// Check if our elements are on the scren 
describe (App.name, ()=> {
    it("should render", () =>{
        render (<App/>);
        expect (screen.getByText ("Subtotal")).toBeInTheDocument();
        expect (screen.getByText ("Forsendelse")).toBeInTheDocument();
        expect (screen.getByText ("Total")).toBeInTheDocument();
        expect (screen.getByText ("Fortsæt til levering")).toBeInTheDocument();
    
    })

})

// Checking if items are removed correctly 
describe (App.name, ()=> {
    it("Should update list to one less", async () =>{
        render (<App/>)
        await screen.findAllByTestId("dataTesting")
        const startIndex = screen.getAllByTestId("dataTesting");
        const startIndexNumber = startIndex.length;
        const closeButton = screen.getAllByTestId("close-buttonTesting")
       
        fireEvent.click(closeButton[0]);
       
        console.log(startIndex.length);
        const endIndex = screen.getAllByTestId("dataTesting");
        const endIndexNumber = endIndex.length;
        console.log(endIndexNumber); 

        expect(endIndexNumber).toEqual(startIndexNumber-1);
    }) 

    }); 

// Test for checking if the checkboxes work
    describe (App.name, ()=> {
        it("Should be checked", async () =>{
            render (<App/>);
            const user = userEvent.setup(); 
            await screen.findAllByTestId("dataTesting");
            const checkbox = screen.getAllByTestId("checkboxTest") as HTMLInputElement[];
            
            expect(checkbox[0].checked).toBe(false); 
            console.log(checkbox[0].checked); 
            await user.click(checkbox[0]);
            expect(checkbox[0].checked).toBe(true);
            console.log(checkbox[0].checked); 

        })

        }); 

// Tests if quanitites change correctly
        describe (App.name, ()=> {
            it("Should be changed from 1 to 5", async () =>{
                render (<App/>);
                const user = userEvent.setup(); 
                await screen.findAllByTestId("dataTesting");
                const quantity = screen.getAllByTestId("quantityTest") as HTMLInputElement[];
                
                expect(quantity[0].value).toEqual("1"); 
                console.log(quantity[0].value);
                await fireEvent.change(quantity[0], {target : {value : 5}} );
                console.log(quantity[0].value); 

                expect(quantity[0].value).toEqual("5");



            })

        }); 


// Tests if shipping is free
        describe (App.name, ()=> {
            it("Should be changed from Free to calculated at next jump", async () =>{
                render (<App/>);
                const user = userEvent.setup(); 
                await screen.findAllByTestId("dataTesting");
                const totalTest = screen.getByTestId("subtotalTest");
                

                const closeButton = screen.getAllByTestId("close-buttonTesting");
    
                const shippingText = screen.getByTestId("shippingTest");
                console.log(shippingText.textContent);
                console.log(totalTest.textContent);
                expect(shippingText.textContent).toBe("GRATIS!");
                
            
                await fireEvent.click(closeButton[1]);

                console.log(shippingText.textContent); 
                console.log(totalTest.textContent);
                expect(shippingText.textContent).toBe("Vil blive beregnet i næste trin");
                


                const quantity = screen.getAllByTestId("quantityTest") as HTMLInputElement[];
                await fireEvent.change(quantity[0], {target : {value : 5}} );
                console.log(shippingText.textContent);
                console.log(totalTest.textContent);
                expect(shippingText.textContent).toBe("GRATIS!");

                

            })

        }); 