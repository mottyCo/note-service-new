import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export const signUpValidator = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  exceptionFactory: (errors: ValidationError[]) => {
    const formattedErrors = errors.map((error) => {
      const firstConstraint =
        error.constraints?.isNotEmpty ??
        Object.values(error.constraints || {})[0];
      return {
        property: error.property,
        message: firstConstraint,
      };
    });
    return new BadRequestException(formattedErrors);
  },
});
