import { render, screen } from "@testing-library/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Home";


it('should have input filed lable as country name', ()=>{
    render(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
            </Routes>
        </BrowserRouter>
    );
    const textField = screen.getByLabelText(/country name/i);
    expect(textField).toBeInTheDocument();
});

it('submit button should be disable if input is empty', ()=>{
    render(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
            </Routes>
        </BrowserRouter>
    );
    const button = screen.getByText(/Submit/i).closest('button');
    expect(button).toHaveAttribute('disabled');
});