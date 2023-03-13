import { Check } from "@mui/icons-material";
import { fireEvent, getByRole, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";
import Checkout from "./Checkout";
import Props from "./Checkout"

describe (Checkout.name, ()=> {

it("Should render", async () => {
    render(<App/>); 
    const navTester = screen.getByTestId("navTest"); 
    await fireEvent.click(navTester); 

    expect (screen.getByText ("Leveringsadresse")).toBeInTheDocument();
    expect (screen.getByText ("Fornavn")).toBeInTheDocument();
    expect (screen.getByText ("Efternavn")).toBeInTheDocument();
    expect (screen.getByText ("Email")).toBeInTheDocument();
    expect (screen.getByText ("Telefonnummer")).toBeInTheDocument();
    expect (screen.getByText ("Leveringsmuligheder")).toBeInTheDocument();
    expect (screen.getByText ("Gå til betaling")).toBeInTheDocument();
}) 

})



// Test if email and phone number works for validation
describe (Checkout.name, ()=> {

    it("Should be invalid email", async () => {
        render(<App/>); 
        const user = userEvent.setup(); 
        const navTester = screen.getByTestId("navTest"); 
        await user.click(navTester);

        const firstnameInput = screen.getByTestId("firstnameTest")as HTMLInputElement; 
        await user.type(firstnameInput, "Firstname"); 


        const lastnameInput = screen.getByTestId("lastnameTest") as HTMLInputElement;
        await user.type(lastnameInput, "Lastname");

    
        const emailTest = screen.getByTestId("emailTest") as HTMLInputElement; 
        await user.type(emailTest, "notvalidemail"); 

        const paymentbutton = screen.getByTestId("paymentbuttonTest") as HTMLButtonElement; 
        //await user.click(paymentbutton);

        console.log(emailTest.checkValidity());
        expect(emailTest).toBeInvalid();

        await user.type(emailTest, "validemail@valid.dk"); 

        const phoneTest = screen.getByTestId("phoneTest") as HTMLInputElement; 
        await user.type(phoneTest, "12345678"); 
        //await user.click(paymentbutton);
        expect(phoneTest).toBeValid(); 
        await user.type(phoneTest, "1234");    
        expect(phoneTest).toBeInvalid(); 
        
    }) 
    
    }) 