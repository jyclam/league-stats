const app = require('./app');

const PORT = process.env.port || 5000;

const start = () => {
  app
    .listen(PORT, () => {
      console.log("Server listening on: ", PORT);
    })
    .on("error", (error) => {
      console.error("Error starting server: ", error);
    });
};

start();
