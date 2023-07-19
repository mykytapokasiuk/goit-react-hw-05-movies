import { Notify } from 'notiflix';

const params = {
  url: 'https://api.themoviedb.org/3/',
  key: '7bade8181fde7cd628993717c20b9542',
};

export default params;

/**
 * Shows a message in case of an error
 *@function onError
 * @param {string} error
 */
export const onError = error => {
  Notify.failure(`Please, try again later. Error: ${error}`, {
    width: '280px',
    showOnlyTheLastOne: true,
    position: 'center-center',
    timeout: 3000,
    fontSize: '13px',
    borderRadius: '8px',
    cssAnimationStyle: 'from-top',
  });
};

/**
 * Shows a message if the input field is empty
 *@function onInputEmpty
 */
export const onInputEmpty = () => {
  Notify.failure('The search field cannot be empty, please try again.', {
    width: '280px',
    showOnlyTheLastOne: true,
    position: 'center-center',
    timeout: 2000,
    fontSize: '15px',
    borderRadius: '8px',
    cssAnimationStyle: 'from-top',
  });
  return '';
};

/**
 * Checks server response, shows message
 *@function checkResponse
 * @param {promise} response
 */
export const checkResponse = (response, setSearch) => {
  if (response.total_results === 0) {
    Notify.failure(
      'Sorry, there are no movies matching your search query. Please try again.',
      {
        width: '260px',
        showOnlyTheLastOne: true,
        position: 'center-center',
        timeout: 2000,
        fontSize: '15px',
        borderRadius: '8px',
        cssAnimationStyle: 'from-top',
      }
    );
    setSearch({
      query: '',
    });
    return;
  }
};
