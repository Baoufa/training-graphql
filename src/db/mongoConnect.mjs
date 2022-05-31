import 'dotenv/config'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import mongoose from 'mongoose';

const mongoConnect = () => {
  mongoose.connect(process.env.URI_MONGODB, {
    connectTimeoutMS: 3000,
    socketTimeoutMS: 20000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

mongoose.connection.once('open', () => {
  console.log(`🌈 Connexion au serveur MongoDB OK`);
});

export default mongoConnect;
