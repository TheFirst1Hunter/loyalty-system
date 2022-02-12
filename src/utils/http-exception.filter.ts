import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '@prisma/client';

@Catch()
export class PrismaErrHandler implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    const status = 400;

    let message: string;

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      const err: any = { ...exception };

      if (err.code === 'P2002') {
        message = `${err.meta.target[0]} field must be unique`;
      }

      if (err.code === 'P2003') {
        message = `A constraint failed on the database: ${
          err.meta.field_name.split('_')[1]
        }`;
      }

      if (err.code == 'P2005') {
        message = `The value ${err.meta.field_value} stored in the database for the field ${err.meta.field_name} is invalid for the field's type`;
      }

      if (err.code === 'P2006') {
        message = `The provided value ${err.meta.field_value} for ${err.meta.model_name} field ${err.meta.field_name} is not valid`;
      }

      if (err.code === 'P2007') {
        message = `data validation err ${err.meta.database_err}`;
      }

      if (err.code === 'P2012') {
        message = `missing a required field ${err.meta.path}`;
      }

      if (err.code === 'P2011') {
        message = `Null constraint violation on the ${err.meta.constraint}`;
      }

      if (err.code === 'P2019') {
        message = `input err ${err.meta.details}`;
      }

      if (err.code === 'P2025') {
        message = err.message;
      }
    }
    response.status(status).json({ statusCode: status, message: [message] });
  }
}
