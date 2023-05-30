const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const startServer = (port=5000) => {
    mongoose.connection.once('open', () => {
    //   logger.info(`Connected to MongoDB on default conn`);
      app.listen(port, () => logger.info(`Server is running on port: ${port}`));
    //   mongoose.connection.on('disconnect', (err) => logger.error(err));
    });
  };

  const run = async (port=5000) => {
    try {
      startServer(port);
    } catch (err) {
    //   logger.error('could not run server');
    //   mongoose.connection.close();
    }
  };
  
  run();