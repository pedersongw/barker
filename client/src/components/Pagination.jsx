import React from "react";
import _ from "lodash";

class Pagination extends React.Component {
  determineHowManyButtons = () => {
    const { totalCount, pageSize, siblingCount, currentPage } = this.props;

    const totalPageCount = Math.ceil(totalCount / pageSize);

    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return _.range(1, totalPageCount + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );
    console.log(leftSiblingIndex, rightSiblingIndex, currentPage);
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    const leftDOTS = "left...";
    const rightDOTS = "right...";

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = _.range(1, leftItemCount + 1);

      return [...leftRange, rightDOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = _.range(
        totalPageCount - rightItemCount + 1,
        totalPageCount + 1
      );
      return [firstPageIndex, leftDOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = _.range(leftSiblingIndex, rightSiblingIndex + 1);
      return [
        firstPageIndex,
        leftDOTS,
        ...middleRange,
        rightDOTS,
        lastPageIndex,
      ];
    }
  };

  mapFromDetermineFunctionToButtons = () => {
    const { updateCurrentPage, currentPage } = this.props;
    let array = this.determineHowManyButtons();
    return array.map(function (arrayIndex, i) {
      if (typeof arrayIndex === "string") {
        return (
          <button
            key={arrayIndex}
            id={arrayIndex}
            className="page-button"
            onClick={() => console.log(arrayIndex)}
          >
            {"..."}
          </button>
        );
      } else {
        return currentPage === arrayIndex ? (
          <button
            key={arrayIndex}
            className="current-page-button"
            id={arrayIndex}
            onClick={(event) => updateCurrentPage(event.target.id)}
          >
            {arrayIndex}
          </button>
        ) : (
          <button
            key={arrayIndex}
            className="page-button"
            id={arrayIndex}
            onClick={(event) => updateCurrentPage(event.target.id)}
          >
            {arrayIndex}
          </button>
        );
      }
    });
  };

  render() {
    return (
      <div>
        <div>
          {this.mapFromDetermineFunctionToButtons(
            this.determineHowManyButtons()
          )}
        </div>
      </div>
    );
  }
}

export default Pagination;
