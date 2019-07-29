import { describe, it, beforeEach } from 'mocha'
import { assert } from 'chai'
import { RequestValidator, ApiValidationErrors } from 'src/modules/common/validators/request.validator'
import { Validator } from 'src/modules/common/validators/validator'
import { mock, when, instance } from 'ts-mockito'
import { ValidationError } from 'class-validator'

describe('RequestValidator', () => {
  let requestValidator: RequestValidator

  let validatorMock: Validator

  let validatorInstance: Validator

  beforeEach(() => {
    requestValidator = new RequestValidator()

    validatorMock = mock(Validator)
    validatorInstance = instance(validatorMock)
  })

  describe('validateRequest', () => {
    it('should return a null error object if no errors are present', async () => {
      when(validatorMock.validate()).thenResolve([])

      const errors: ApiValidationErrors = await requestValidator.validateRequest(validatorInstance, {})

      assert.isNull(errors)
    })

    it('should return appropriate errors with custom messages if provided', async () => {
      when(validatorMock.validate()).thenResolve([
        createValidationError('requiredFieldOne'),
        createValidationError('requiredFieldTwo')
      ])

      const errors: ApiValidationErrors = await requestValidator.validateRequest(validatorInstance, {})

      assert.equal(Object.keys(errors).length, 2)

      assert.isDefined(errors.requiredFieldOne)
      assert.isDefined(errors.requiredFieldTwo)

      assert.equal(errors.requiredFieldOne.message, 'error for requiredFieldOne')
      assert.equal(errors.requiredFieldTwo.message, 'error for requiredFieldTwo')
    })

    it('should map errors correctly', async () => {
      when(validatorMock.validate()).thenResolve([
        createValidationError('requiredFieldTwo', ''),
        createValidationError('emptyField', 'some value')
      ])

      const errors: ApiValidationErrors = await requestValidator.validateRequest(validatorInstance, {})

      assert.equal(Object.keys(errors).length, 2)

      assert.isDefined(errors.requiredFieldTwo)
      assert.equal(errors.requiredFieldTwo.value, '')

      assert.isDefined(errors.emptyField)
      assert.equal(errors.emptyField.value, 'some value')
    })
  })
})

function createValidationError(property: string, value?: any): ValidationError {
  const error: ValidationError = {
    property: property,
    children: [],
    constraints: {
      someConstraint: `error for ${property}`
    }
  }

  if (value !== undefined) {
    error.value = value
  }

  return error
}
