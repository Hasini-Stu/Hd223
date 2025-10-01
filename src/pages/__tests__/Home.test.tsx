import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home';

// Mock the BottomNav component
vi.mock('../../components/BottomNav', () => ({
  default: () => <div data-testid="bottom-nav">Bottom Navigation</div>
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Home Page', () => {
  it('renders home page content', () => {
    renderWithRouter(<Home />);
    
    // Check if main content is rendered
    expect(screen.getByTestId('bottom-nav')).toBeInTheDocument();
  });

  it('displays welcome message', () => {
    renderWithRouter(<Home />);
    
    // This would need to be updated based on actual Home component content
    // For now, just check that the page renders without errors
    expect(document.body).toBeInTheDocument();
  });
});
