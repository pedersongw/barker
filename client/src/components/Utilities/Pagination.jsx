import React from "react";
import _ from "lodash";
import { FaEllipsisH } from "react-icons/fa";
import styles from "./Pagination.module.css";

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

  updatePage = (event) => {
    this.props.updateCurrentPage(Number(event.target.id));
  };

  mapFromDetermineFunctionToButtons = () => {
    const { currentPage, sort } = this.props;
    let array = this.determineHowManyButtons();
    let updatePage = this.updatePage;
    return array.map(function (arrayIndex, i) {
      if (typeof arrayIndex === "string") {
        return (
          <button
            id={arrayIndex}
            key={arrayIndex}
            className={`${styles.pageButton} ${styles.elipsis}`}
          >
            <FaEllipsisH />
          </button>
        );
      } else {
        return currentPage === arrayIndex ? (
          <button
            className={`${styles.pageButton} ${styles.currentPageButton}`}
            id={arrayIndex}
            key={arrayIndex}
            onClick={(event) => updatePage(event)}
          >
            {arrayIndex}
          </button>
        ) : (
          <button
            className={styles.pageButton}
            key={arrayIndex}
            id={arrayIndex}
            onClick={(event) => updatePage(event)}
          >
            {arrayIndex}
          </button>
        );
      }
    });
  };

  render() {
    return (
      <div className={styles.pagination}>
        {this.mapFromDetermineFunctionToButtons(this.determineHowManyButtons())}
      </div>
    );
  }
}

export default Pagination;
