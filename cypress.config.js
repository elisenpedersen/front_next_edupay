// cypress.config.js
module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // Aquí puedes agregar cualquier lógica adicional si es necesario
    },
    env: {
      testUser: {
        email: 'jalbertonisalini@itba.edu.ar',
        password: 'TestPassword123',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJnb29nbGUtb2F1dGgyfDEwMDI1NTYxNTAzNTU4ODAxMzc4MCIsImVtYWlsIjoiamFsYmVydG9uaXNhbGluaUBpdGJhLmVkdS5hciIsImlhdCI6MTcyODkxNTg2MywiZXhwIjoxNzI5NTIwNjYzfQ.ZBcGlWd4YAeRzOfBYQE62DBOSQqouq0aXnHuIOYCz7w',
        name: 'Test User',
      },
      NEXT_PUBLIC_API_URL: 'http://localhost:3001',
    },
  },
};
