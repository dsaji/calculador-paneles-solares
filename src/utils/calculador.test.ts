import { computePanels } from './calculador';

describe('Cuantos paneles caben?', () => {
  it('Paneles 1x2 y techo 2x4 => Caben 4', () => {
    const panel = {
      height: 1,
      width: 2,
    };
    const roof = {
      height: 2,
      width: 4,
    };
    const result = computePanels(roof, panel);
    expect(result.count).toBe(4);
  });
  it('Paneles 1x2 y techo 3x5 => Caben 7', () => {
    const panel = {
      height: 1,
      width: 2,
    };
    const roof = {
      height: 3,
      width: 5,
    };
    const result = computePanels(roof, panel);
    expect(result.count).toBe(7);
  });
  it('Paneles 2x2 y techo 1x10 => Caben 0', () => {
    const panel = {
      height: 2,
      width: 2,
    };
    const roof = {
      height: 1,
      width: 10,
    };
    const result = computePanels(roof, panel);
    expect(result.count).toBe(0);
  });
});
