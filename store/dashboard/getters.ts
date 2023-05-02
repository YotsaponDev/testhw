import { state } from './state';

export const getters = {
  fullName: () => {
    return `${state.name} Doe`;
  }
};
