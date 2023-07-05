import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Pokedex from '../pages/Pokedex';
import { PokemonButtonsPanel } from '../components';
import { FavoritePokemonIdsObjType, PokemonType } from '../types';

const pokemonList: PokemonType[] = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
    image: 'https://archives.bulbagarden.net/media/upload/0/0a/Spr_5b_004.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Alola Route 3',
        map: 'https://archives.bulbagarden.net/media/upload/9/93/Alola_Route_3_Map.png',
      },
      // ...outras localizações
    ],
    summary: 'The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly.',
  },
  {
    id: 65,
    name: 'Alakazam',
    type: 'Psychic',
    averageWeight: {
      value: '48.0',
      measurementUnit: 'kg',
    },
    image: 'https://archives.bulbagarden.net/media/upload/8/88/Spr_5b_065_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Alakazam_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Unova Accumula Town',
        map: 'https://archives.bulbagarden.net/media/upload/4/44/Unova_Accumula_Town_Map.png',
      },
    ],
    summary: 'Closing both its eyes heightens all its other senses. This enables it to use its abilities to their extremes.',
  },
  {
    id: 151,
    name: 'Mew',
    type: 'Psychic',
    averageWeight: {
      value: '4.0',
      measurementUnit: 'kg',
    },
    image: 'https://archives.bulbagarden.net/media/upload/4/43/Spr_5b_151.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Mew_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Faraway Island',
        map: 'https://archives.bulbagarden.net/media/upload/e/e4/Hoenn_Faraway_Island_Map.png',
      },
    ],
    summary: 'Apparently, it appears only to those people who are pure of heart and have a strong desire to see it.',
  },
];

const favoritePokemonIdsObj: FavoritePokemonIdsObjType = {
  25: true,
  4: true,
};

const POKEMON_NAME_TESTID = 'pokemon-name';

describe('Pokedex component', () => {
  test('página contém um heading h2 com o texto Encountered Pokémon', () => {
    render(
      <Router>
        <Pokedex
          pokemonList={ pokemonList }
          favoritePokemonIdsObj={ favoritePokemonIdsObj }
        />
      </Router>,
    );

    const heading = screen.getByRole('heading', { level: 2, name: /Encountered Pokémon/i });
    expect(heading).toBeInTheDocument();
  });

  test('exibe o próximo Pokémon da lista quando o botão "Próximo Pokémon" é clicado', () => {
    render(
      <Router>
        <Pokedex
          pokemonList={ pokemonList }
          favoritePokemonIdsObj={ favoritePokemonIdsObj }
        />
      </Router>,
    );

    const nextPokemonButton = screen.getByTestId(POKEMON_NAME_TESTID);

    fireEvent.click(nextPokemonButton);
    const currentPokemonName = screen.getByTestId(POKEMON_NAME_TESTID);
    expect(currentPokemonName.textContent).toBe('Pikachu');
  });

  test('mostra apenas um Pokémon por vez', () => {
    render(
      <Router>
        <Pokedex
          pokemonList={ pokemonList }
          favoritePokemonIdsObj={ favoritePokemonIdsObj }
        />
      </Router>,
    );

    const nextPokemonButton = screen.getByTestId(POKEMON_NAME_TESTID);
    const pokemonCount = pokemonList.length;

    for (let i = 1; i < pokemonCount; i++) {
      fireEvent.click(nextPokemonButton);
      const visiblePokemonCount = screen.getAllByTestId(POKEMON_NAME_TESTID).length;
      expect(visiblePokemonCount).toBe(1);
    }
  });

  test('Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição', () => {
    render(
      <Router>
        <Pokedex
          pokemonList={ pokemonList }
          favoritePokemonIdsObj={ favoritePokemonIdsObj }
        />
      </Router>,
    );

    // Capturando os botões de filtro usando o atributo data-testid
    const botõesFiltro = screen.getAllByTestId('pokemon-type-button');

    // Extraindo o conteúdo de texto dos botões de filtro
    const textosBotões = botõesFiltro.map((botão) => botão.textContent);

    // Usando um Set para remover duplicatas
    const textosBotõesÚnicos = new Set(textosBotões);

    // Verificando se o número de botões de filtro coincide com o número de tipos únicos
    expect(botõesFiltro.length).toBe(textosBotõesÚnicos.size);
  });

  test('a Pokédex circula apenas pelos Pokémon do tipo selecionado após a seleção de um botão de tipo', () => {
    render(
      <Router>
        <Pokedex
          pokemonList={ pokemonList }
          favoritePokemonIdsObj={ favoritePokemonIdsObj }
        />
      </Router>,
    );

    const nextPokemonButton = screen.getByTestId(POKEMON_NAME_TESTID);

    // Seleciona o tipo "Psychic"
    const psychicTypeButton = screen.getByText('Psychic');
    fireEvent.click(psychicTypeButton);

    let currentPokemon = pokemonList.find((pokemon) => pokemon.type === 'Psychic');
    expect(currentPokemon).toBeDefined();

    fireEvent.click(nextPokemonButton);
    currentPokemon = pokemonList.find((pokemon) => pokemon.type === 'Psychic');
    expect(currentPokemon).toBeDefined();

    fireEvent.click(nextPokemonButton);
    currentPokemon = pokemonList.find((pokemon) => pokemon.type === 'Psychic');
    expect(currentPokemon).toBeDefined();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    render(
      <Router>
        <Pokedex
          pokemonList={ pokemonList }
          favoritePokemonIdsObj={ favoritePokemonIdsObj }
        />
      </Router>,
    );

    const allTypeButton = screen.getByText('All');
    fireEvent.click(allTypeButton);

    const resetFilterButton = screen.getByText('All');
    fireEvent.click(resetFilterButton);

    const currentPokemonName = screen.getByTestId('pokemon-name');
    expect(currentPokemonName.textContent).not.toContain('Psychic');
  });
  test('onClick deve estar presente no componente PokemonButtonsPanel', () => {
    const pokemonTypes = ['Fire', 'Water', 'Grass'];
    let clickedFilter = '';

    const filterPokemon = (type: string) => {
      clickedFilter = type;
    };

    render(
      <Router>
        <PokemonButtonsPanel
          pokemonTypes={ pokemonTypes }
          filterPokemon={ filterPokemon }
        />
      </Router>,
    );

    const resetFilterButton = screen.getByText('All');
    expect(resetFilterButton).toBeInTheDocument();

    fireEvent.click(resetFilterButton);
    expect(clickedFilter).toBe('all');
  });
  test('A função filterPokemonByType deve estar presente na Pokedex', () => {
    render(
      <Router>
        <Pokedex
          pokemonList={ pokemonList }
          favoritePokemonIdsObj={ favoritePokemonIdsObj }
        />
      </Router>,
    );
  });
  test('onClick event handler tem que estar presente na aplicação', () => {
    const pokemonTypes = ['Fire', 'Water', 'Grass']; // Example pokemon types
    let clickedFilter = '';

    const filterPokemon = (type: string) => {
      clickedFilter = type;
    };

    render(
      <Router>
        <PokemonButtonsPanel
          pokemonTypes={ pokemonTypes }
          filterPokemon={ filterPokemon }
        />
      </Router>,
    );

    const pokemonTypeButtons = screen.getAllByTestId('pokemon-type-button');

    pokemonTypeButtons.forEach((button, index) => {
      const pokemonType = pokemonTypes[index];
      fireEvent.click(button);
      expect(clickedFilter).toBe(pokemonType);
    });
  });
});
