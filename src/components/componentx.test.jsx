import renderScreen from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ComponentX from './ComponentX';
import { describe } from 'vitest';

describe('ComponentX', () => {
  it('renders ComponentX correctly', () => {
    renderScreen.render(
      <MemoryRouter>
        <ComponentX />
      </MemoryRouter>
    );
  });
});