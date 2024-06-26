import {ExpressErrorMiddlewareInterface, Middleware} from "routing-controllers";
import {Service} from "typedi";
import {Request, Response} from 'express';

@Middleware({type: 'after'})
@Service()
export class ErrorMiddleware implements ExpressErrorMiddlewareInterface {
    error(error: any, request: Request, response: Response, next: (err?: any) => any): void {
        const status: number = error.status || 400
        response.status(status).json({
            "error": error.message,
        });
    }
}