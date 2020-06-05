import * as React from 'react';
import { PageComponentProps } from '@openmrs/app-shell';
import { performPatientSearch } from './api';
import styles from './search.css';

function debounce(callback: (...args: Array<any>) => void, time: number) {
  let interval = undefined;

  return (...args) => {
    clearTimeout(interval);
    interval = setTimeout(() => {
      interval = null;
      callback(...args);
    }, time);
  };
}

const PatientSearch: React.FC<PageComponentProps> = ({ piral }) => {
  const searchTimeout = 300;
  const resultsPerPage = 10;
  const customReprestation =
    'custom:(patientId,uuid,identifiers,display,patientIdentifier:(uuid,identifier),person:(gender,age,birthdate,birthdateEstimated,personName,display),attributes:(value,attributeType:(name)))';

  const [searchResults, setSearchResults] = React.useState([]);
  const [emptyResult, setEmptyResult] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [pagedResults, setPagedResults] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [showNextButton, setShowNextButton] = React.useState(false);
  const [showPreviousButton, setShowPreviousButton] = React.useState(false);

  React.useEffect(() => {
    setShowNextButton(currentPage * resultsPerPage <= searchResults.length);
    setShowPreviousButton(currentPage !== 1);
  }, [pagedResults, currentPage, resultsPerPage]);

  React.useEffect(() => {
    const ac = new AbortController();
    if (searchTerm) {
      performPatientSearch(searchTerm, customReprestation).then((data) => {
        const results = data.results.map((res, i) => ({
          ...res,
          index: i + 1,
        }));
        const pagedResults = results.slice(0, resultsPerPage);
        setSearchResults(results);
        setPagedResults(pagedResults);
        setTotalPages(Math.ceil(results.length / 10));

        if (!data.results) {
          setCurrentPage(1);
          setEmptyResult(true);
        } else {
          setEmptyResult(false);
        }
      });
    } else {
      setCurrentPage(1);
      setEmptyResult(false);
      setSearchResults([]);
      setPagedResults([]);
    }
    return () => ac.abort();
  }, [searchTerm]);

  const handleChange = debounce((searchTerm) => setSearchTerm(searchTerm), searchTimeout);

  const nextPage = () => {
    let upperBound = currentPage * resultsPerPage + resultsPerPage;
    const lowerBound = currentPage * resultsPerPage;
    if (upperBound > searchResults.length) {
      upperBound = searchResults.length;
    }
    const pageResults = searchResults.slice(lowerBound, upperBound);
    setPagedResults(pageResults);
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    const lowerBound = currentPage * resultsPerPage - resultsPerPage * 2;
    const upperBound = currentPage * resultsPerPage - resultsPerPage;
    const pageResults = searchResults.slice(lowerBound, upperBound);
    setPagedResults(pageResults);
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div className={styles.patientSearchHeader}>
        <input
          className={`omrs-type-title-5 ${styles.patientSearchInput}`}
          placeholder="Search for patient"
          aria-label="Search for patient"
          onChange={($event) => handleChange($event.target.value)}
          autoFocus
        />
      </div>
      <div className={styles.searchResults}>
        {!!searchResults.length && (
          <div>
            <div className={styles.resultsCount}>
              <p>
                <span className={styles.resultsText}>Results:</span> {searchResults.length}
              </p>
              <p className={styles.resultsText}>
                Page {currentPage} of {totalPages}
              </p>
            </div>
            {pagedResults.map((patient) => (
              <piral.Extension
                name="patient-result"
                params={{ patient, searchTerm }}
                key={patient.uuid}
                empty={() => (
                  <div>
                    {patient.index} <b>{patient.person.display}</b>
                  </div>
                )}
              />
            ))}
          </div>
        )}
      </div>
      {!searchResults.length && !emptyResult && (
        <div className={styles.searchHelper}>
          <p className={`omrs-type-body-regular ${styles.helperText}`}>
            Search by <span className="omrs-bold">patient number</span>
          </p>
          <p className={`omrs-type-body-regular ${styles.helperText}`}>If unsuccessful, try patient name</p>
        </div>
      )}
      {emptyResult && (
        <div className={styles.emptyResultContainer}>
          <div className={styles.emptyResultCard}>
            <div className={styles.emptyResultText}>Sorry, no patient has been found.</div>
            <div className={styles.emptyResultText}>
              Try to search with one of:
              <ul className={styles.dash}>
                <li>patient unique ID number</li>
                <li>patient name(s)</li>
              </ul>
            </div>
          </div>
        </div>
      )}
      <div className={styles.pagination}>
        {showPreviousButton && (
          <button onClick={previousPage} className={`omrs-btn omrs-outlined-action omrs-rounded ${styles.prevBtn}`}>
            Previous
          </button>
        )}
        {showNextButton && (
          <button onClick={nextPage} className={`omrs-btn omrs-outlined-action omrs-rounded ${styles.nextBtn}`}>
            Next
          </button>
        )}
      </div>
    </>
  );
};

export default PatientSearch;
