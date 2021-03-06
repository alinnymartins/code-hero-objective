import useControls from './useControls'

function usePagination({ data, dataOffset, controlsOffset }) {
  const totalOfPages = Math.ceil(data.length / dataOffset)
  const { currentPage, renderControls, verifyCurrentPage } = useControls({
    totalOfPages,
    controlsOffset
  })

  function getPaginatedData() {
    const start = currentPage * dataOffset - dataOffset
    const end = start + dataOffset
    const paginatedItems = data.slice(start, end)

    return paginatedItems
  }

  return {
    renderControls,
    getPaginatedData,
    verifyCurrentPage
  }
}

export default usePagination;