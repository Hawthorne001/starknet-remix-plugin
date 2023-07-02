import { BigNumber } from 'ethers'
import { uint256 } from 'starknet'
import * as Yup from 'yup'

export const transformInputs = (val: string) => {
  const isArrayRegex = /[,[\]]/
  const replaceSquareBracesRegex = /[[\]]/g

  if (!val.match(isArrayRegex)) {
    const num = BigNumber.from(val.trim())
    return num
  } else {
    const newVal = val.replaceAll(replaceSquareBracesRegex, '')
    const newArr = newVal.split(',')
    return newArr.map((str) => BigNumber.from(str.trim()))
  }
}

const typeValidation = (
  type: string,
  value: BigNumber | BigNumber[]
): boolean => {
  let isValid = false
  try {
    if (!Array.isArray(value)) {
      switch (type) {
        case 'core::integer::u8':
          return value.lte(255)
        case 'core::integer::u16':
          return value.lte(65535)
        case 'core::integer::u32':
          return value.lte(4294967295)
        case 'core::integer::u64':
          return value.lte(2 ** 64)
        case 'core::integer::u128':
          return value.lte(uint256.UINT_128_MAX)
        default:
      }
    } else if (Array.isArray(value)) {
      switch (type) {
        case 'core::integer::u256':
          // Should be only 2 comma seperated value
          if (value.length !== 2) {
            return false
          }
          value.forEach((v) => {
            if (!v.lte(uint256.UINT_128_MAX)) {
              return false
            }
          })
          break
      }
    }
    return isValid
  } catch (e) {
    console.log(e)
    return false
  }
}

// Add Methods here
Yup.addMethod(Yup.string, 'validate_ip', function (type: string) {
  return this.test('check inputs', type, function (val) {
    const { createError } = this
    if (val !== undefined) {
      try {
        const i_p = transformInputs(val)
        console.log(i_p)
        const isValid = typeValidation(type, i_p)
        if(!isValid) {
            return createError(new Yup.ValidationError(`${val} is not correct for type ${type}`))
        }
        return true
      } catch (e: any) {
        return createError(new Yup.ValidationError(e?.message || e))
      }
    }
    return createError(new Yup.ValidationError('value is required'))
  })
})

export default Yup
