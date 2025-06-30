import { configureStore } from '@reduxjs/toolkit';
import EditUserReducer from "../slice/Edit";
import UserDataReducer from "../slice/UserData"
import modalValReducer from '../slice/modalSlice';
import nodesValReducer from '../slice/nodes';

export const store = configureStore({
  reducer: {
   editUser : EditUserReducer,
   userData: UserDataReducer,
   modal: modalValReducer,
   nodesVal: nodesValReducer,
  },
});