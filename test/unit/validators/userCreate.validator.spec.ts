import { describe, it, beforeEach } from 'mocha'
import { assert } from 'chai'
import { ValidationError } from 'class-validator'
import { UserCreateValidator } from 'src/validators/userCreate.validator'

describe('UserCreateValidator', () => {

  let validator: UserCreateValidator

  beforeEach(() => {
    validator = new UserCreateValidator()
    validator.email = 'user@mail.com'
    validator.firstName = 'Test'
    validator.lastName = 'User'
  })

  it('should not return any errors when valid properties are provided', async () => {
    assert.isEmpty(await validator.validate())
  })

  describe('email', () => {
    it('should return an error when an email is not provided', async () => {
      validator.email = null

      const errors: ValidationError[] = await validator.validate()

      assert.equal(errors.length, 1)
      assert.equal(errors[0].property, 'email')
      assert.isNotNull(errors[0].constraints.isNotEmpty)
    })

    it('should return an error when an invalid email is provided', async () => {
      validator.email = 'not an email'

      const errors: ValidationError[] = await validator.validate()

      assert.equal(errors.length, 1)
      assert.equal(errors[0].property, 'email')
      assert.isNotNull(errors[0].constraints.isEmail)
    })
  })

  describe('firstName', () => {
    it('should return an error when firstName is not provided', async () => {
      validator.firstName = null

      const errors: ValidationError[] = await validator.validate()

      assert.equal(errors.length, 1)
      assert.equal(errors[0].property, 'firstName')
      assert.isNotNull(errors[0].constraints.isNotEmpty)
    })

    it('should return an error when firstName is greater than 100 characters', async () => {
      validator.firstName = 'x'.repeat(101)

      const errors: ValidationError[] = await validator.validate()

      assert.equal(errors.length, 1)
      assert.equal(errors[0].property, 'firstName')
      assert.isNotNull(errors[0].constraints.maxLength)
    })
  })

  describe('lastName', () => {
    it('should return an error when lastName is not provided', async () => {
      validator.lastName = null

      const errors: ValidationError[] = await validator.validate()

      assert.equal(errors.length, 1)
      assert.equal(errors[0].property, 'lastName')
      assert.isNotNull(errors[0].constraints.isNotEmpty)
    })

    it('should return an error when lastName is greater than 100 characters', async () => {
      validator.lastName = 'x'.repeat(101)

      const errors: ValidationError[] = await validator.validate()

      assert.equal(errors.length, 1)
      assert.equal(errors[0].property, 'lastName')
      assert.isNotNull(errors[0].constraints.maxLength)
    })
  })
})
