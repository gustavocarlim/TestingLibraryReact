import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Pokemon } from '../components';
import { PokemonType } from '../types';

const pokemon: PokemonType = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'pikachu.png',
  foundAt: [],
  moreInfo: '',
  summary: '',
};

describe('testa a aplicação pokemon', () => {
  test('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    render(
      <Pokemon
        pokemon={ pokemon }
        showDetailsLink={ false }
        isFavorite={ false }
      />,
    );

    const pokemonNameElement = screen.getByTestId('pokemon-name');
    expect(pokemonNameElement).toHaveTextContent('Pikachu');

    const pokemonTypeElement = screen.getByTestId('pokemon-type');
    expect(pokemonTypeElement).toHaveTextContent('Electric');

    const pokemonWeightElement = screen.getByTestId('pokemon-weight');
    expect(pokemonWeightElement).toHaveTextContent('Average weight: 6.0 kg');

    const pokemonImageElement = screen.getByAltText('Pikachu sprite');
    expect(pokemonImageElement).toHaveAttribute('src', 'pikachu.png');
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
    render(
      <BrowserRouter>
        <Pokemon
          pokemon={ pokemon }
          showDetailsLink
          isFavorite={ false }
        />
      </BrowserRouter>,
    );

    const detailsLinkElement = screen.getByRole('link', { name: 'More details' });
    expect(detailsLinkElement).toHaveAttribute('href', '/pokemon/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
    render(
      <Pokemon
        pokemon={ pokemon }
        showDetailsLink={ false }
        isFavorite
      />,
    );

    const favoriteIconElement = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteIconElement).toHaveAttribute('src', '/star-icon.svg');
  });
});
