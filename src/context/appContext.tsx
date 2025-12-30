import { createContext, useContext, useReducer, type ReactNode } from "react";
import { ActionTypes, type AppContextAction, type AppState } from "./types";

type Props = {
  children?: ReactNode;
  initialState?: Partial<AppState>;
};

interface ApplicationData {
  state: AppState;
  dispatch: React.Dispatch<AppContextAction>;
}

const defaultState: AppState = {
  appContants: null,
};

const reducer = (state: AppState, action: AppContextAction): AppState => {
  console.log('Reducer: ', state);
  console.log('Reducer: ', action.payload);
  switch (action.type) {
    case ActionTypes.setAppConstant:
      return {
        ...state,
        appContants: action.payload,
      };
    default:
      return state;
  }
};

const AppContext = createContext<ApplicationData>({
  state: defaultState,
  dispatch: () => undefined,
});

export const AppContextProvider: React.FC<Props> = ({
  children,
  initialState,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    ...defaultState,
    ...initialState,
  });
  console.log("APP state: ",initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext() {
  return useContext(AppContext);
}