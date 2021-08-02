import { useState } from "react"

export const useFormDate = (initialState = {}) => {
  const [formState, setFormState] = useState(initialState)

  const handleInputChange = ({target}) => {
    setFormState({
      ...formState,
      [target.name]: target.value
    })
  }

  const handleDateChange = (kindDate, date) => {
    setFormState({
      ...formState,
      [kindDate]: date
    });
  }

  const handleResetForm = () => {
    return setFormState(initialState);
  }

  return [formState, handleInputChange, handleDateChange, handleResetForm];
}
