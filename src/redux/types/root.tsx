import { AuthState } from "./auth";
import { PageloadState } from "./pageload";

export interface RootState {
  auth: AuthState
  pageload: PageloadState
}