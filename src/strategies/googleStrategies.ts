import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from "dotenv";
import { prismaClient } from '../prismaRender';
import { User } from '@prisma/client';


dotenv.config()

export default passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string ,
    callbackURL: "localhost:3000/api/auth/google/callback",
    scope : ["profile", "email"]
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      
      let user = await prismaClient.user.findUnique({
        where: { googleID: profile.id },
      });

      // Jika pengguna tidak ada, buat pengguna baru
      if (!user) {
        user = await prismaClient.user.create({
          data: {
            googleID: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0].value || "",
            password : ""
          },
        });
      }
      // Mengembalikan pengguna
      done(null, user);
    } catch (error) {
      done(error,  false);
    }
  }
));

// Menyimpan pengguna ke sesi
passport.serializeUser((user : any , done) => {
  done(null, user.id);
});

// Mengambil pengguna dari sesi
passport.deserializeUser(async (id : string, done) => {
  
  const user = await prismaClient.user.findFirst({ 
    where:
      { id : parseInt(id) },  
  });
  done(null, user);
});
