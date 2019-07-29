import { Injectable } from '@nestjs/common'
import { ValidationError } from 'class-validator'
import { Validator } from 'src/modules/common/validators/validator'
import { extend } from 'lodash'

export interface ApiValidationErrors {
  [property: string]: ApiValidationError
}

export interface ApiValidationError {
  value?: string
  message: string
}

@Injectable()
export class RequestValidator {

  public async validateRequest<T>(validator: Validator, request: T): Promise<ApiValidationErrors> {
    extend(validator, request)
    return this.mapErrors(await validator.validate())
  }

  private mapErrors(validationErrors: ValidationError[]): ApiValidationErrors {
    if (validationErrors.length > 0) {
      return this.mapToApiValidationErrors(validationErrors)
    }

    return null
  }

  private mapToApiValidationErrors(validationErrors: ValidationError[]): ApiValidationErrors {
    const errors: ApiValidationErrors = {}

    for (const validationError of validationErrors) {
      const fieldErrorKey = validationError.property
      errors[fieldErrorKey] = { message: this.getFirstFailedConstraint(validationError) }

      if (validationError.value !== undefined) {
        errors[fieldErrorKey].value = validationError.value
      }
    }

    return errors
  }

  private getFirstFailedConstraint(validationError: ValidationError): string {
    return validationError.constraints[Object.keys(validationError.constraints)[0]]
  }
}
