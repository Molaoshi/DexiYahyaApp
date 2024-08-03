import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Result } from "@/app/types/interface";

const initialRouteState: {
  isRoutesFetched: boolean;
  selectedRoute: Result | undefined;
  routes: Result[];
} = {
  isRoutesFetched: false,
  selectedRoute: undefined,
  routes: [],
};

export const routeSlice = createSlice({
  name: "routes",
  initialState: initialRouteState,
  reducers: {
    getRoutes(state, action: PayloadAction<{ routes: Result[] }>) {
      return { ...state, routes: action.payload.routes };
    },
    setSelectedRoute(state, action: PayloadAction<{ route: Result }>) {
      return { ...state, selectedRoute: action.payload.route };
    },
    updateRouteFetched(
      state,
      action: PayloadAction<{ isRouteFetched: boolean }>
    ) {
      return { ...state, isRoutesFetched: action.payload.isRouteFetched };
    },
    resetRoute(_) {
      return initialRouteState;
    },
  },
});

export const { resetRoute, getRoutes, updateRouteFetched, setSelectedRoute } =
  routeSlice.actions;
