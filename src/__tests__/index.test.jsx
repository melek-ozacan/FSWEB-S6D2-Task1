import { beforeEach, expect, test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

let dom;
let document;
beforeEach(() => {
  dom = render(<App />);
  document = dom.container;
});

test("Arama Çubuğu component'i eklenmiş", () => {
  expect(screen.queryByPlaceholderText(/Arama/i)).not.toBe(null);
});

test("Gönderiler component'i eklenmiş", () => {
  expect(screen.queryAllByText(/philzcoffee/i)).not.toBe(null);
  expect(screen.queryAllByText(/twitch/i)).not.toBe(null);
});

test("Arama Çubuğu'na doğru prop'lar gönderiliyor ve search yapabiliyor.", async () => {
  const arama = screen.queryByPlaceholderText(/Arama/i);
  fireEvent.input(arama, { target: { value: 'phil' } });
  expect(screen.queryByText(/Twitch/i)).toBe(null);
});

test("Gönderiler component'ine doğru prop'lar gönderiliyor ve like yapabiliyor.", async () => {
  expect(screen.queryAllByText(/philzcoffee/i)).not.toBe(null);
  expect(screen.queryAllByText(/twitch/i)).not.toBe(null);
  const likes = screen.queryAllByTestId('like-button');
  fireEvent.click(likes[0]);
  expect(screen.queryByText(/401 likes/i)).not.toBe(null);
});
