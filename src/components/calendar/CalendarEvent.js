import React from 'react'

export const CalendarEvent = ({
  event
}) => {
  const {title, user} = event;
  return (
    <div>
      <span>
          <p className="mb-0">{title}</p>
          <p className="text-end text-capitalize fst-italic">- {user.name}</p>
      </span>
    </div>
  )
}
