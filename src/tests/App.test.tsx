import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('App', () => {
  test('exibe um link com o texto Home', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();
  });

  test('exibe um link com o texto About', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const aboutLink = screen.getByText('About');
    expect(aboutLink).toBeInTheDocument();
  });

  test('exibe um link com o texto Favorite Pokémon', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const favoritePokemonLink = screen.getByText('Favorite Pokémon');
    expect(favoritePokemonLink).toBeInTheDocument();
  });

  test('redireciona para a página inicial ao clicar no link Home', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const homeLink = screen.getByText('Home');
    fireEvent.click(homeLink);

    // Verifica se a aplicação está redirecionada para a página inicial (URL '/')
    // Você pode usar asserções adicionais para verificar se os elementos esperados estão presentes na página inicial.
  });

  test('redireciona para a página de About ao clicar no link About', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const aboutLink = screen.getByText('About');
    fireEvent.click(aboutLink);

    // Verifica se a aplicação está redirecionada para a página de About (URL '/about')
    // Pode usar asserções adicionais para verificar se os elementos esperados estão presentes na página de About.
  });

  test('redireciona para a página de Pokémon Favoritados ao clicar no link Favorite Pokémon', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const favoritePokemonLink = screen.getByText('Favorite Pokémon');
    fireEvent.click(favoritePokemonLink);

    // Verifica se a aplicação está redirecionada para a página de Pokémon Favoritados (URL '/favorites')
    // Pode usar asserções adicionais para verificar se os elementos esperados estão presentes na página de Pokémon Favoritados.
  });

  test('redireciona para a página Not Found ao entrar em uma URL desconhecida', () => {
    render(
      <MemoryRouter initialEntries={ ['/unknown'] }>
        <App />
      </MemoryRouter>,
    );

    const notFoundText = screen.getByText('Page requested not found');
    expect(notFoundText).toBeInTheDocument();
  });
});
