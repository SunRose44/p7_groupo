// Mise en place des modules
const express = require('express');
const mongoose = require('mongoose');
// Module sécurités sanitize, helmet et rate limit
const sanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const cors = require('cors')
const rateLimit = require('express-rate-limit');
const path = require('path');

const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

// Connection à la base de données
mongoose.connect('mongodb+srv://Projet_7_GP:Vpiz80xrzOK@cluster0.kmn41vd.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// CORS
app.use(cors())
app.options('*', cors())

// Helmet
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

// API rate limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limite chaque IP à 100 requetes par `window` (ici, par 15 minutes)
    standardHeaders: true, // Retourne rate limit info dans `RateLimit-*` headers
    legacyHeaders: false, // Ne pas désactiver le `X-RateLimit-*` headers
})

// Applique le middleware de limitation de débit à toutes les requêtes
app.use(limiter);

// Definition de l'utilisation d'express mongo sanitize
app.use(
    sanitize({
        allowDots: true,
        replaceWith: '_',
    }),
);
app.use(
    sanitize({
        onSanitize: ({ req, key }) => {
            console.warn(`This request[${key}] is sanitized`, req);
        },
    }),
);

// Gestion des routes principales
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/posts', postRoutes);
app.use('/api/post', postRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;