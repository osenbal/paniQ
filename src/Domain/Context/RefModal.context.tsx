import { createContext, useContext, useMemo, useState } from "react";
import {
  RefHandlerModalDisqus,
  RefHandlerPostDetail,
  RefHandlerModalQrcode,
} from "@/Presentation/Components/Modal";

interface RefModalStateType {
  modalQrcodeRef: React.MutableRefObject<RefHandlerModalQrcode>;
  modalPostDetailRef: React.MutableRefObject<RefHandlerPostDetail>;
  modalDisqusRef: React.MutableRefObject<RefHandlerModalDisqus>;
}
const refModalState: RefModalStateType = {
  modalPostDetailRef: {} as React.MutableRefObject<RefHandlerPostDetail>,
  modalDisqusRef: {} as React.MutableRefObject<RefHandlerModalDisqus>,
  modalQrcodeRef: {} as React.MutableRefObject<RefHandlerModalQrcode>,
};

export const RefModalContext = createContext({
  refModalState,
  setRefModalState: () => undefined,
});

RefModalContext.displayName = "RefModalContext";

export const RefModalProvider = (props: any) => {
  const [state, setState] = useState(refModalState);

  const value = useMemo(() => {
    return {
      refModalState: state,
      setRefModalState: setState,
    };
  }, [state, setState]);

  return <RefModalContext.Provider value={value} {...props} />;
};

export function useRefModalContext(): {
  setState: (
    patch:
      | Partial<RefModalStateType>
      | ((previousState: RefModalStateType) => Partial<RefModalStateType>)
  ) => void;
  state: RefModalStateType;
} {
  const context = useContext(RefModalContext);

  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }

  const { refModalState, setRefModalState } = context;
  return {
    state: refModalState,
    setState: setRefModalState,
  };
}
