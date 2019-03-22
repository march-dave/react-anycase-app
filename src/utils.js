/**
 * Return array sorting done
 * @param {Array} listItems - Array or Array Object.
 * @param {string} propertyName - custom property name / can be sort by property name.
 * @param {string} asc - sorting ascending or descending initial config: ascending.
 * @returns {Array} listItems - sorting done and return.
 *
 * When we return 1, the function communicates to sort()
 * Returning -1 would do the opposite.
 * Returning 0 would do no sorting.
 */

export const sortAlphabetize = (listItems, propertyName = '', asc = true) => {
    if (propertyName.length > 1) {
      if (asc === true) {
        return listItems.sort((a, b) => {
          if (a[propertyName].toUpperCase() < b[propertyName].toUpperCase()) {
            return -1;
          }
          if (a[propertyName].toUpperCase() > b[propertyName].toUpperCase()) {
            return 1;
          }
          return 0;
        });
      }
  
      return listItems.sort((a, b) => {
        if (a[propertyName].toUpperCase() < b[propertyName].toUpperCase()) {
          return 1;
        }
        if (a[propertyName].toUpperCase() > b[propertyName].toUpperCase()) {
          return -1;
        }
        return 0;
      });
    }
  
    if (asc === true) {
      return listItems.sort((a, b) => {
        if (a.toUpperCase() < b.toUpperCase()) {
          return -1;
        }
        if (a.toUpperCase() > b.toUpperCase()) {
          return 1;
        }
        return 0;
      });
    }
  
    return listItems.sort((a, b) => {
      if (a.toUpperCase() < b.toUpperCase()) {
        return 1;
      }
      if (a.toUpperCase() > b.toUpperCase()) {
        return -1;
      }
      return 0;
    });
  };
  