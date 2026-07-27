# DevLens Test Suite

This directory contains the automated backend test suite for DevLens.

## Structure

- auth/ - Authentication tests
- repository/ - Repository API tests
- analysis/ - Analytics, Deployment, Technical Debt, Engineering Health, AI Review, Pull Request tests
- integration/ - End-to-end workflow tests
- helpers/ - Shared testing utilities

## Running Tests

Run all tests:

```bash
npm test
```

Run repository tests:

```bash
npm run test:repository
```

Run integration tests:

```bash
npm run test:integration
```