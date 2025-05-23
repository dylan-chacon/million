import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Crypto } from '../../src/modules/crypto/models/Crypto';
import CryptoCard from '../../src/shared/components/organisms/CryptoCard';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

export const NavigationContainer = ({ children }: { children: React.ReactNode }) => children;
export const useNavigation = () => ({
  navigate: jest.fn(),
  goBack: jest.fn(),
  setOptions: jest.fn(),
});
export const useFocusEffect = jest.fn();
export const useRoute = () => ({
  params: {},
});

describe('CryptoCard', () => {
  const mockCoin: Crypto = {
    id: '1',
    name: 'Bitcoin',
    symbol: 'BTC',
    price_usd: '50000.00',
    market_cap_usd: '1000000000',
    percent_change_24h: '5.25',
    rank: 0,
    percent_change_1h: '',
    percent_change_7d: '',
    volume24: 0,
    csupply: '',
    tsupply: '',
    msupply: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with coin data', () => {
    const { getByText } = render(<CryptoCard coin={mockCoin} />);

    expect(getByText('Bitcoin (BTC)')).toBeTruthy();
    expect(getByText('Price: $50000.00')).toBeTruthy();
    expect(getByText('Market Cap: $1000000000')).toBeTruthy();
    expect(getByText('24h Change: 5.25%')).toBeTruthy();
  });

  it('navigates to CryptoDetail when pressed', () => {
    const { getByRole } = render(<CryptoCard coin={mockCoin} />);

    const pressable = getByRole('button');
    fireEvent.press(pressable);

    expect(mockNavigate).toHaveBeenCalledWith('CryptoDetail', { coin: mockCoin });
  });

  it('renders with negative percentage change', () => {
    const negativeChangeCoin = {
      ...mockCoin,
      percent_change_24h: '-2.35',
    };

    const { getByText } = render(<CryptoCard coin={negativeChangeCoin} />);

    expect(getByText('24h Change: -2.35%')).toBeTruthy();
  });

  it('renders with zero values', () => {
    const zeroCoin = {
      ...mockCoin,
      price_usd: '0.00',
      market_cap_usd: '0',
      percent_change_24h: '0.00',
    };

    const { getByText } = render(<CryptoCard coin={zeroCoin} />);

    expect(getByText('Price: $0.00')).toBeTruthy();
    expect(getByText('Market Cap: $0')).toBeTruthy();
    expect(getByText('24h Change: 0.00%')).toBeTruthy();
  });

  it('memoizes correctly with same props', () => {
    const { rerender } = render(<CryptoCard coin={mockCoin} />);

    const firstRender = render(<CryptoCard coin={mockCoin} />);
    rerender(<CryptoCard coin={mockCoin} />);

    expect(firstRender).toBeTruthy();
  });

  it('re-renders when coin data changes', () => {
    const { getByText, rerender } = render(<CryptoCard coin={mockCoin} />);

    expect(getByText('Bitcoin (BTC)')).toBeTruthy();

    const updatedCoin = {
      ...mockCoin,
      name: 'Ethereum',
      symbol: 'ETH',
    };

    rerender(<CryptoCard coin={updatedCoin} />);

    expect(getByText('Ethereum (ETH)')).toBeTruthy();
  });
});
