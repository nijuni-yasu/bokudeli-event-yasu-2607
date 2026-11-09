import { describe, expect, it } from 'vitest'
import { shouldDeployBackupFunctions } from './deployTarget.js'

describe('shouldDeployBackupFunctions', () => {
  it('deploys backup functions to production and development', () => {
    expect(shouldDeployBackupFunctions('bokudeli-event-dev')).toBe(true)
    expect(shouldDeployBackupFunctions('bokudeli-event-test')).toBe(true)
  })

  it('skips backup functions on sandbox projects', () => {
    expect(shouldDeployBackupFunctions('bokudeli-event-yasu-2603')).toBe(false)
    expect(shouldDeployBackupFunctions('bokudeli-event-yasu-2510')).toBe(false)
  })

  it('deploys backup functions when the project ID is unknown', () => {
    expect(shouldDeployBackupFunctions(undefined)).toBe(true)
  })
})
