import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from 'react-router-dom';
import CountryDetail from '../CountryDetail';

const state = {
    officialName : "india",
    capital: "delhi",
    population: 12923209,
    flag : "https://",
}

it("onclick 'capital weather' button weather information shown", async ()=>{
    render(
        <MemoryRouter initialEntries={[{ pathname: '/countr', state:state }]}>
            <CountryDetail />
        </MemoryRouter>
    );
    const btn = screen.getByText(/Capital Weather/i).closest('button') as HTMLElement;
    await act(async () => {
        userEvent.click(btn);
    });
    expect((await screen.findAllByText(/Temperature/i)).length).toEqual(1);
    expect((await screen.findAllByText(/Wind Speed/i)).length).toEqual(1);
    expect((await screen.findAllByText(/Precip /i)).length).toEqual(1);
});