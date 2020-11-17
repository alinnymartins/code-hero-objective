import React from 'react'
import { usePagination } from './hooks'

export default function FlatList(props) {
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