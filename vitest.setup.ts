// src/tests/setup.js
import { render, cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import '@testing-library/jest-dom/vitest'; // for extended matchers like toBeInTheDocument

// Run cleanup after each test
afterEach(() => {
    cleanup();
    vi.clearAllMocks()
});