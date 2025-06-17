import { calculateBMI } from '../bmi';

describe('Backend BMI Calculator Logic', () => {
  test('should return correct BMI for valid height (cm) and weight (kg)', () => {
    expect(calculateBMI(175, 70)).toBeCloseTo(22.9, 1);
  });

  test('should return null for zero or negative height/weight', () => {
    expect(calculateBMI(0, 70)).toBeNull();
    expect(calculateBMI(175, 0)).toBeNull();
    expect(calculateBMI(-175, 70)).toBeNull();
    expect(calculateBMI(175, -70)).toBeNull();
  });

  test('should return number when input is valid', () => {
    const result = calculateBMI(160, 55);
    expect(typeof result).toBe('number');
  });
});
