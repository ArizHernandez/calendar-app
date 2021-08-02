import { Types } from "../../types/types";

const initialState = {
  modalState: false
}

export const uiReducer = (state = initialState, action) => {

  switch (action.type) {
    case Types.uiModalOpen:
      return ({
        ...state,
        modalState: true
      });
      
    case Types.uiModalClosed:
      return ({
        ...state,
        modalState: false
      })

    default:
      return state;
  }

}