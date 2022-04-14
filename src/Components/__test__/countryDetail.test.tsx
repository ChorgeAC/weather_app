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

it("On page load country name should display", ()=>{
    render(
        <MemoryRouter initialEntries={[{ pathname: '/countryDetail', state:state }]}>
            <CountryDetail />
        </MemoryRouter>

    );
    const name = screen.getByText(state.officialName);
    expect(name).toBeInTheDocument();
});

it("On page load country flag should display", ()=>{
    render(
        <MemoryRouter initialEntries={[{ pathname: '/countryDetail', state:state }]}>
            <CountryDetail />
        </MemoryRouter>

    );
    const imgtag = screen.getByAltText(state.officialName);
    expect(imgtag).toHaveAttribute('src',state.flag);
});

it("onclick 'capital weather' button weather information shown", async ()=>{
    render(
        <MemoryRouter initialEntries={[{ pathname: '/countryDetail', state:state }]}>
            <CountryDetail />
        </MemoryRouter>
    );
    const btn = screen.getByText(/Capital Weather/i).closest('button') as HTMLElement;
    await act(async () => {
        userEvent.click(btn);
    });
    expect((await screen.findByText(/Temperature/i))).toBeInTheDocument();
});

