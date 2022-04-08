import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './';
import { onSearch, searchLoadMore, featuredLoadMore } from './home.logic';

test('renders the home container', () => {
  render(<Home />);
  const containerElement = screen.getByTestId('home-container');
  expect(containerElement).toBeInTheDocument();
});

test('renders the header component in home component', () => {
  render(<Home />);
  const containerElement = screen.getByTestId('header-container');
  expect(containerElement).toBeInTheDocument();
});

test('renders the infinite scroll component', () => {
  render(<Home />);

  const element = screen.getByTestId('feed-container');

  expect(element).toBeInTheDocument();
});

test('search functionality', () => {
  const order = 'relevant';
  const orientation = 'all';
  const setPage = jest.fn();
  const setLoading = jest.fn();
  const setPhotos = jest.fn();
  const setTotalPhotos = jest.fn();
  const setSearch = jest.fn();

  onSearch(order, orientation, setPage, setLoading, setPhotos, setTotalPhotos, setSearch)('hello');

  expect(setPage).toBeCalled();
  expect(setLoading).toBeCalled();
});

test('search functionality with no search value', () => {
  const order = 'relevant';
  const orientation = 'all';
  const setPage = jest.fn();
  const setLoading = jest.fn();
  const setPhotos = jest.fn();
  const setTotalPhotos = jest.fn();
  const setSearch = jest.fn();

  onSearch(order, orientation, setPage, setLoading, setPhotos, setTotalPhotos, setSearch)('');

  expect(setPage).toBeCalledTimes(0);
  expect(setLoading).toBeCalledTimes(0);
  expect(setSearch).toBeCalledTimes(1);
});

test('search load more functionality', () => {
  const query = 'Search Test';
  const order = 'relevant';
  const orientation = 'all';
  const page = 1;
  const photos = [] as any[];
  const setPage = jest.fn((x) => x === page + 1);
  const setPhotos = jest.fn();

  searchLoadMore(query, order, orientation, page, photos, setPage, setPhotos);

  expect(setPage).toHaveBeenCalledWith(page + 1);
});

test('random load more functionality', () => {
  const page = 1;
  const photos = [] as any[];
  const setPage = jest.fn((x) => x === page + 1);
  const setPhotos = jest.fn();

  featuredLoadMore(page, photos, setPhotos, setPage);

  expect(setPage).toHaveBeenCalledWith(page + 1);
});
