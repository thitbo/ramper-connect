
import create from 'zustand';
import { persist } from 'zustand/middleware';

const STATE_DEFAULT = {
  appProvider: 'coin98',
};

export const useStoreGlobal = create(
  persist(
    (set) => ({
      ...STATE_DEFAULT,
      setAppProvider: (newProvider) => {
        set(() => ({
          appProvider: newProvider,
        }));
      },
    }),
    {
      name: 'global', // unique name
    }
  )
);
