import { create, all } from 'mathjs';

// Create configured mathjs instance to prevent readonly global config error
export const math = create(all, {
  number: 'BigNumber',
  precision: 64,
});

export default math;
