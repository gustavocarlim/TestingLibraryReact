import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FavoritePokemon from '../pages/FavoritePokemon';

describe('FavoritePokemon', () => {
  test('exibe a mensagem "No favorite Pokémon found" quando não há Pokémon favoritado', () => {
    render(
      <MemoryRouter>
        <FavoritePokemon pokemonList={ [] } />
      </MemoryRouter>,
    );
    const messageElement = screen.getByText(/No favorite Pokémon found/i);
    expect(messageElement).toBeInTheDocument();
  });

  test('exibe apenas os Pokémon favoritados', () => {
    const pokemonList = [
      {
        id: 1,
        name: 'Pikachu',
        type: 'Electric',
        averageWeight: {
          measurementUnit: 'kg',
          value: '6.0',
        },
        foundAt: [
          {
            location: 'Viridian Forest',
            map: 'Kanto',
          },
        ],
        image: 'pikachu.png',
        moreInfo: 'https://pokemon.com/pikachu',
        summary: 'This is Pikachu.',
      },
      {
        id: 2,
        name: 'Charizard',
        type: 'Fire/Flying',
        averageWeight: {
          measurementUnit: 'kg',
          value: '90.5',
        },
        foundAt: [
          {
            location: 'Cerulean Cave',
            map: 'Kanto',
          },
        ],
        image: 'charizard.png',
        moreInfo: 'https://pokemon.com/charizard',
        summary: 'This is Charizard.',
      },
    ];

    render(
      <MemoryRouter>
        <FavoritePokemon pokemonList={ pokemonList } />
      </MemoryRouter>,
    );

    const pikachuElement = screen.getByText(/Pikachu/i);
    const charizardElement = screen.getByText(/Charizard/i);
    const noPokemonFoundElement = screen.queryByText(/No favorite Pokémon found/i);

    expect(pikachuElement).toBeInTheDocument();
    expect(charizardElement).toBeInTheDocument();
    expect(noPokemonFoundElement).not.toBeInTheDocument();
  });
});
