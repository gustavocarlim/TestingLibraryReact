import { render, screen } from '@testing-library/react';
import { About } from '../pages';

describe('About', () => {
  test('exibe as informações sobre a Pokédex', () => {
    render(<About />);

    // Verifica se o texto "About Pokédex" está presente no heading h2
    const heading = screen.getByRole('heading', { level: 2, name: /about pokédex/i });
    expect(heading).toBeInTheDocument();

    // Verifica se existem dois parágrafos com os textos corretos
    const paragraphs = screen.getAllByText(/This application simulates a Pokédex|One can filter Pokémon by type/i);
    expect(paragraphs).toHaveLength(2);
    paragraphs.forEach((paragraph) => {
      expect(paragraph).toBeInTheDocument();

      // Verifica se a imagem da Pokédex está presente e possui o atributo src correto
      const image = screen.getByAltText('Pokédex');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute(
        'src',
        'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
      );
    });
  });
});
