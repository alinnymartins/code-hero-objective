import React from 'react'
import { usePagination } from './hooks'

export default function Pagination(props) {
  const { renderControls, getPaginatedData, verifyCurrentPage } = usePagination(
    props
  )

  return (
    <>
      <div className="containerCharacter">
        <section>
          {getPaginatedData().map((data, index, array) =>
            props.render(data, index, array, verifyCurrentPage)
          )}
        </section>
      </div>
      {renderControls()}
    </>
  )
}