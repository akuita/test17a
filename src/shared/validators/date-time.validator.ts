import { registerDecorator, ValidationOptions, ValidationArguments, isDate } from 'class-validator';

export function IsDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return isDate(value);
        },
      },
    });
  };
}