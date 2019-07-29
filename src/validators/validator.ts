import { ValidationError, validate } from 'class-validator'

export abstract class Validator {

  public validate(): Promise<ValidationError[]> {
    return validate(this)
  }

}
