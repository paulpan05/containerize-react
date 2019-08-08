import { ActionCreator, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

export type ThunkActionCreator = ActionCreator<ThunkAction<void, {}, {}, AnyAction>>;