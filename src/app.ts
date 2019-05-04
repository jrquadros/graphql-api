import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import * as cors from 'cors';

import db from './models'
import schema from './graphql/schema'
import { extractJWTMiddleware } from './graphql/middlewares/extract-jwt.middeware';

class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
    }

    private middleware(): void {

        //cors habilitado
        this.express.use(cors());

        this.express.use('/graphql',

            extractJWTMiddleware(),
            
            (req, res, next) => {
                req['context'].db = db;
                next();
            },
        
            graphqlHTTP((req) => ({
            schema: schema,
            graphiql: true, //process.env.NODE_ENV === 'develpment',
            context: req['context']
        }))
        );
        
    }
}

export default new App().express;