import * as jwt from 'jsonwebtoken';
import { GraphQLFieldResolver } from "graphql";

import { ComposableResolver } from "./composable.resolver";
import { ResolverContext } from "../../interfaces/ResolverContextInterface";
import { JWT_SECRET } from '../../utils/utils';

export const verifyTokenResolver: ComposableResolver<any, ResolverContext> = 
    (resolver: GraphQLFieldResolver<any, ResolverContext>): GraphQLFieldResolver<any, ResolverContext> => {

        return (parent, args, context: ResolverContext, info) => {

            const token: string = context.autorization ? context.autorization.split(' ')[1] : undefined;

            jwt.verify(token, JWT_SECRET, (err, decoded: any) => {

                if(!err) {
                    return resolver(parent, args, context, info);
                }

                throw new Error(`${err.name}: ${err.message}`);

            });

        };

    };