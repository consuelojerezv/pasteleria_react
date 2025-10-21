import { fmtCLP } from './currency'

describe('fmtCLP', () => {
  it('formatea como pesos chilenos', () => {
    const s = fmtCLP(45000)
    expect(s.startsWith('$')).toBe(true)
  })
})
