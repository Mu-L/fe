import { createGlobalState } from 'react-hooks-global-state';

export const { useGlobalState } = createGlobalState<{
  tableFields: string[];
}>({
  tableFields: [],
});
