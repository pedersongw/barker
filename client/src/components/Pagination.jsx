import React from "react";
import _ from "lodash";
import { FaEllipsisH } from "react-icons/fa";
import { Link } from "react-router-dom";

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
    const { currentPage, sort } = this.props;
    let array = this.determineHowManyButtons();
    return array.map(function (arrayIndex, i) {
      if (typeof arrayIndex === "string") {
        return (
          <Link key={arrayIndex} to={`/forum/${arrayIndex}/${sort}`}>
            <button
              id={arrayIndex}
              className="page-button elipsis"
              onClick={() => console.log(arrayIndex)}
            >
              <FaEllipsisH />
            </button>
          </Link>
        );
      } else {
        return currentPage === arrayIndex ? (
          <Link key={arrayIndex} to={`/forum/${arrayIndex}/${sort}`}>
            <button className="page-button current-page-button" id={arrayIndex}>
              {arrayIndex}
            </button>
          </Link>
        ) : (
          <Link key={arrayIndex} to={`/forum/${arrayIndex}/${sort}`}>
            <button className="page-button" id={arrayIndex}>
              {arrayIndex}
            </button>
          </Link>
        );
      }
    });
  };

  render() {
    return (
      <div className="pagination-div">
        {this.mapFromDetermineFunctionToButtons(this.determineHowManyButtons())}
      </div>
    );
  }
}

export default Pagination;
