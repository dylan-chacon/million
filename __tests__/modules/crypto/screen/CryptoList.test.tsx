import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Crypto } from '../../../../src/modules/crypto/models/Crypto';
import CryptoListScreen from '../../../../src/modules/crypto/screen/CryptoList';
const mockUseFetchCryptos = require('../../../../src/modules/crypto/hooks/useGetCrypto.ts').useFetchCryptos as jest.Mock;
const mockUseCryptoStore = require('../../../../src/modules/crypto/store/useCryptoStore').useCryptoStore as jest.Mock;

jest.mock('../../../../src/modules/crypto/hooks/useGetCrypto.ts');
jest.mock('../../../../src/modules/crypto/store/useCryptoStore.ts');

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


describe('CryptoListScreen', () => {
  const mockCryptos: Crypto[] = [
    {
      id: '1',
      name: 'Bitcoin',
      symbol: 'BTC',
      price_usd: '50000.00',
      market_cap_usd: '1000000000',
      percent_change_24h: '5.25',
      rank: 1,
      percent_change_1h: '1.5',
      percent_change_7d: '10.2',
      volume24: 1000000,
      csupply: '19000000',
      tsupply: '21000000',
      msupply: '21000000',
    },
    {
      id: '2',
      name: 'Ethereum',
      symbol: 'ETH',
      price_usd: '3000.00',
      market_cap_usd: '500000000',
      percent_change_24h: '-2.15',
      rank: 2,
      percent_change_1h: '0.8',
      percent_change_7d: '5.1',
      volume24: 800000,
      csupply: '120000000',
      tsupply: '120000000',
      msupply: null,
    },
  ];

  const defaultMockFetchCryptos = {
    isLoading: false,
    error: null,
    hasNextPage: true,
    fetchNextPage: jest.fn(),
  };

  const defaultMockCryptoStore = {
    filtered: mockCryptos,
    search: '',
    setSearch: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseFetchCryptos.mockReturnValue(defaultMockFetchCryptos);
    mockUseCryptoStore.mockReturnValue(defaultMockCryptoStore);
  });

  it('renders loading state correctly', () => {
    mockUseFetchCryptos.mockReturnValue({
      ...defaultMockFetchCryptos,
      isLoading: true,
    });

    const { getByTestId } = render(<CryptoListScreen />);

    expect(getByTestId('activity-indicator')).toBeTruthy();
  });

  it('renders error state correctly', () => {
    mockUseFetchCryptos.mockReturnValue({
      ...defaultMockFetchCryptos,
      error: new Error('Network error'),
    });

    const { getByText } = render(<CryptoListScreen />);

    expect(getByText('Error al cargar datos')).toBeTruthy();
  });

  it('handles search input changes', () => {
    const mockSetSearch = jest.fn();
    mockUseCryptoStore.mockReturnValue({
      ...defaultMockCryptoStore,
      setSearch: mockSetSearch,
    });

    const { getByPlaceholderText } = render(<CryptoListScreen />);
    const searchInput = getByPlaceholderText('Search coin...');

    fireEvent.changeText(searchInput, 'Bitcoin');

    expect(mockSetSearch).toHaveBeenCalledWith('Bitcoin');
  });

  it('calls loadMore when hasNextPage is true and onEndReached is triggered', () => {
    const mockFetchNextPage = jest.fn();
    mockUseFetchCryptos.mockReturnValue({
      ...defaultMockFetchCryptos,
      hasNextPage: true,
      fetchNextPage: mockFetchNextPage,
    });

    const { getByTestId } = render(<CryptoListScreen />);
    const flatList = getByTestId('flat-list');

    fireEvent(flatList, 'onEndReached');

    expect(mockFetchNextPage).toHaveBeenCalledTimes(1);
  });

  it('does not call fetchNextPage when hasNextPage is false', () => {
    const mockFetchNextPage = jest.fn();
    mockUseFetchCryptos.mockReturnValue({
      ...defaultMockFetchCryptos,
      hasNextPage: false,
      fetchNextPage: mockFetchNextPage,
    });

    const { getByTestId } = render(<CryptoListScreen />);
    const flatList = getByTestId('flat-list');

    fireEvent(flatList, 'onEndReached');

    expect(mockFetchNextPage).not.toHaveBeenCalled();
  });

  it('loadMore callback is memoized correctly', () => {
    const mockFetchNextPage = jest.fn();
    mockUseFetchCryptos.mockReturnValue({
      ...defaultMockFetchCryptos,
      hasNextPage: true,
      fetchNextPage: mockFetchNextPage,
    });

    const { rerender, getByTestId } = render(<CryptoListScreen />);
    const flatList = getByTestId('flat-list');

    fireEvent(flatList, 'onEndReached');
    expect(mockFetchNextPage).toHaveBeenCalledTimes(1);

    rerender(<CryptoListScreen />);
    fireEvent(flatList, 'onEndReached');
    expect(mockFetchNextPage).toHaveBeenCalledTimes(2);
  });

  it('updates loadMore when dependencies change', () => {
    const mockFetchNextPage1 = jest.fn();
    const mockFetchNextPage2 = jest.fn();

    // First render
    mockUseFetchCryptos.mockReturnValue({
      ...defaultMockFetchCryptos,
      hasNextPage: true,
      fetchNextPage: mockFetchNextPage1,
    });

    const { rerender, getByTestId } = render(<CryptoListScreen />);

    // Second render with different fetchNextPage
    mockUseFetchCryptos.mockReturnValue({
      ...defaultMockFetchCryptos,
      hasNextPage: true,
      fetchNextPage: mockFetchNextPage2,
    });

    rerender(<CryptoListScreen />);
    const flatList = getByTestId('flat-list');
    fireEvent(flatList, 'onEndReached');

    expect(mockFetchNextPage2).toHaveBeenCalledTimes(1);
    expect(mockFetchNextPage1).not.toHaveBeenCalled();
  });

  it('renders with correct FlatList props', () => {
    const { getByTestId } = render(<CryptoListScreen />);
    const flatList = getByTestId('flat-list');

    expect(flatList.props.data).toEqual(mockCryptos);
    expect(flatList.props.onEndReachedThreshold).toBe(0.5);
    expect(flatList.props.initialNumToRender).toBe(20);
    expect(flatList.props.maxToRenderPerBatch).toBe(20);
    expect(flatList.props.windowSize).toBe(10);
    expect(flatList.props.removeClippedSubviews).toBe(true);
  });

  it('renders empty list when no filtered data', () => {
    mockUseCryptoStore.mockReturnValue({
      ...defaultMockCryptoStore,
      filtered: [],
    });

    const { getByTestId } = render(<CryptoListScreen />);
    const flatList = getByTestId('flat-list');

    expect(flatList.props.data).toEqual([]);
  });

  it('preserves search value across re-renders', () => {
    mockUseCryptoStore.mockReturnValue({
      ...defaultMockCryptoStore,
      search: 'Bitcoin',
    });

    const { getByDisplayValue } = render(<CryptoListScreen />);

    expect(getByDisplayValue('Bitcoin')).toBeTruthy();
  });
});
