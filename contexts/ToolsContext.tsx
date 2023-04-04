import * as React from 'react';

interface AppContextInterface {
  valueA: any;
  setValueA: any;
  valueB: any;
  setValueB: any;
}

export const SimpleCtx = React.createContext<AppContextInterface | null>(null);

const CtxProvider: React.FC = (props) => {
  const [valueA, setValueA] = React.useState(null);
  const [valueB, setValueB] = React.useState(null);
  return (
    <SimpleCtx.Provider
      value={{
        valueA,
        setValueA,
        valueB,
        setValueB,
      }}
    >
      {props.children}
    </SimpleCtx.Provider>
  );
};

export default CtxProvider;
