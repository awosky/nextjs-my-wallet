import { createContext, useMemo, useState } from "react";

export const SyncContext = createContext<any>({
  sync: false,
  setSync: () => null,
});

const SyncProvider = ({ children }: { children: JSX.Element }) => {
  const [sync, setSync] = useState<boolean>(false);
  const value = useMemo(() => ({ sync, setSync }), [sync]);

  return <SyncContext.Provider value={value}>{children}</SyncContext.Provider>;
};

export default SyncProvider;
