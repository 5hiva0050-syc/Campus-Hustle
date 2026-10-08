import '@testing-library/jest-dom';

// Mock window.scrollTo
if (typeof window !== 'undefined') {
  window.scrollTo = () => {};
}

// Mock Element.prototype.scrollIntoView for JSDOM
if (typeof Element !== 'undefined') {
  Element.prototype.scrollIntoView = () => {};
}
