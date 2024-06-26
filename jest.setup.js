const originalError = console.error;

beforeAll(() => {
  console.error = (...args) => {
    if (/Warning: validateDOMNesting/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;

window.google = {
  maps: {
    places: {
      AutocompleteService: class {
        getPlacePredictions() {}
      },
    },
    Geocoder: class {
      geocode() {}
    },
  },
};
