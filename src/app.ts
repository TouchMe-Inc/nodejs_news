import 'reflect-metadata';
import {Action, createExpressServer, getMetadataArgsStorage, useContainer} from 'routing-controllers';
import {Container} from 'typedi';
import {controllers} from './controllers';
import {middlewares} from "./middlewares";
import {useSwagger} from "./swagger";
import {JwtService} from "./services/jwt.service";
import {UsersService} from "./services/users.service";
import {RoutingControllersOptions} from "routing-controllers/types/RoutingControllersOptions";

useContainer(Container);

const routingControllersOptions: RoutingControllersOptions = {
    routePrefix: '/',
    defaultErrorHandler: false,
    interceptors: [],
    controllers,
    middlewares,
    authorizationChecker: async (action: Action, roles: string[]) => {
        const token = action.request.headers['authorization'];

        const payload = await Container.get(JwtService).verify(token);

        // @ts-ignore
        const userId = payload.id;

        const user = await Container.get(UsersService).getById(userId);

        if (!user) {
            return false;
        }

        return !!(!roles.length || roles.find(role => user.role === role));
    },
}

const app: any = createExpressServer(routingControllersOptions);

useSwagger(app, getMetadataArgsStorage(), routingControllersOptions);

export default app;