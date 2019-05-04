import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import * as cors from 'cors';

import db from './models'
import schema from './graphql/schema'

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
            
            (req, res, next) => {
                req['context'] = {};
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