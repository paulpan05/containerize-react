import { ActionCreator, AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

export type ThunkActionCreatorPreset = ActionCreator<ThunkAction<void, {}, {}, AnyAction>>;
export type ThunkDispatchPreset = ThunkDispatch<{}, {}, AnyAction>;