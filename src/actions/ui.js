import { Types } from "../types/types";

export const openModal = () => ({
  type: Types.uiModalOpen
})

export const closeModal = () => ({
  type: Types.uiModalClosed
})