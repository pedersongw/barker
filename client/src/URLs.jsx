const prod = `http://barkerfield-test.herokuapp.com`;

const dev = `http://localhost:3000`;

export const config = process.env.NODE_ENV === `development` ? dev : prod;
