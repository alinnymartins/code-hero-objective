import { useState } from "react";

export default function useControls({ totalOfPages, controlsOffset = 5 }) {
  const [currentPage, setCurrentPage] = useState(1);

  function scrollTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  function next() {
    const isLastPage = currentPage >= totalOfPages;

    isLastPage
      ? setCurrentPage(() => totalOfPages)
      : setCurrentPage(() => currentPage + 1);
      scrollTop();
  }

  function prev() {
    currentPage <= 1
      ? setCurrentPage(() => 1)
      : setCurrentPage((prevState) => prevState - 1);
      scrollTop();
  }

  function goTo(targetPage) {
    targetPage > totalOfPages
      ? setCurrentPage(() => totalOfPages)
      : setCurrentPage(() => (targetPage < 1 ? 1 : targetPage));
  }

  function calculateMaxVisible() {
    let maxLeft = currentPage - Math.floor(controlsOffset / 2);
    let maxRight = currentPage + Math.floor(controlsOffset / 2);

    if (maxLeft < 1) {
      maxLeft = 1;
      maxRight = controlsOffset;
    }
    if (maxRight > totalOfPages) {
      maxLeft = totalOfPages - (controlsOffset - 1);
      maxRight = totalOfPages;

      if (maxLeft < 1) {
        maxLeft = 1;
      }
    }

    return { maxLeft, maxRight };
  }

  function renderControlIndexes() {
    const { maxLeft, maxRight } = calculateMaxVisible();

    let indexes = [];

    for (let page = maxLeft; page <= maxRight; page++) {
      indexes.push(page);
    }
    scrollTop();

    return indexes.map((index) => (
      <button
        className={
          currentPage === index ? "paginationItem active" : "paginationItem"
        }
        key={index}
        onClick={() => goTo(index)}
      >
        {index}
      </button>
    ));
  }

  function renderControls() {
    return (
      <div className="footer">
        <div className="pagination">
          <section className="containerPagination">
            {currentPage !== 1 ? (
              <button className="paginationItem" onClick={prev}>
                {"<"}
              </button>
            ) : (
              ""
            )}
            {renderControlIndexes()}
            <button className="paginationItem" onClick={next}>
              {">"}
            </button>
          </section>
        </div>
      </div>
    );
  }

  function verifyCurrentPage(props) {
    let verify = false;
    if (currentPage >= props) {
      verify = true;
    }
    return verify;
  }

  return {
    currentPage,
    renderControls,
    verifyCurrentPage
  };
}
