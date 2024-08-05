import {USER_TYPES} from "./user.types";
import { setReducerAction } from "../../utils/reducer/action.reducer";

export const setCurrentUser = (user) => setReducerAction(USER_TYPES.CREATE_USER, user);
