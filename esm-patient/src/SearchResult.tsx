import * as React from 'react';
import { Link } from 'react-router-dom';
import { ExtensionComponentProps } from '@openmrs/app-shell';
import { always } from 'kremling';
import styles from './search-result.css';

export interface PatientResultParams {
  patient: any;
  searchTerm: string;
}

const PatientResult: React.FC<ExtensionComponentProps<PatientResultParams>> = ({ params: { patient, searchTerm } }) => {
  const preferredIdentifier = patient.identifiers.find((i) => i.preferred) || patient.identifiers[0];

  function highlight(property) {
    return property.toLowerCase().includes(searchTerm.toLowerCase());
  }

  return (
    <Link className={styles.patientResult} to={`/patients/${patient.uuid}`}>
      <span className={styles.resultNumber}>{patient.index}</span>
      <div className={styles.patientCard}>
        <div className={styles.patientNameContainer}>
          <span
            className={always('omrs-type-title-5')
              .always('omrs-bold')
              .always(styles.patientName)
              .maybe(styles.highlight, highlight(patient.person.display))}>
            {patient.person.display}
          </span>
          <button className="omrs-unstyled">
            <svg className="omrs-icon" fill="var(--omrs-color-interaction)">
              <use xlinkHref="#omrs-icon-chevron-right"></use>
            </svg>
          </button>
        </div>
        <div className={styles.patientDetailsContainer}>
          <div className={styles.tile}>
            <div className={styles.patientData}>{patient.person.gender}</div>
          </div>
          <div className={styles.tile}>
            <div className={styles.patientData}>{patient.person.age}</div>
            <div className={styles.patientDataLabel}>years</div>
          </div>
          <div className={styles.tile}>
            <div className={styles.patientData}>{patient.person.birthdate}</div>
            <div className={styles.patientDataLabel}>birth date</div>
          </div>
          <div className={styles.tile}>
            <div
              className={always(styles.patientData).maybe(styles.highlight, highlight(preferredIdentifier.identifier))}>
              {preferredIdentifier.identifier}
            </div>
            <div className={styles.patientDataLabel}>{preferredIdentifier.identifierType.display}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PatientResult;
