import 
      express ,
      { Express , Request , Response } 
from "express";
import dotenv from "dotenv";
import rootRouter from "./routes";
import { errorMiddleware } from "./middlewares/error_middleware";
import { PrismaClient } from '@prisma/client';
import { signUpSchema } from "./models/usersModel";
import { prismaClient } from "./prismaRender";
import session from "express-session";
import passport from "passport";
import './strategies/googleStrategies';


dotenv.config();

const app:Express = express();
const PORT = process.env.PORT || 3030;

app.use(express.json());
app.use(
  session({
    secret: "blackCactus",
    resave: false,
    saveUninitialized: false, 
    cookie: {
      secure: false, // Gunakan true jika menggunakan HTTPS
      maxAge: 10 * 60 * 60 * 1000 // 10 jam dalam milidetik
    },
    // store: .create({
    //   client: mongoose.connection.getClient(),
    // }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", rootRouter);
app.use((errorMiddleware) as express.ErrorRequestHandler);
prismaClient



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});