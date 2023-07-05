import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';

describe('NotFound', () => {
  test('exibe um heading h2 com o texto "Page requested not found"', () => {
    render(<NotFound />);
    const headingElement = screen.getByRole('heading', { level: 2 });
    expect(headingElement).toHaveTextContent('Page requested not found');
  });
  test('exibe a imagem correta', () => {
    render(<NotFound />);
    const imageElement = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(imageElement).toHaveAttribute(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
