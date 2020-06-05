import * as React from 'react';
import { Link } from 'react-router-dom';
import { PageComponentProps } from '@openmrs/app-shell';
import { SearchIcon } from './assets/SearchIcon';
import styles from './home.css';

const Home: React.FC<PageComponentProps> = ({ piral }) => {
  const { buttons } = piral.getCurrentConfig();

  return (
    <div className={styles.homeDashboard}>
      <section className={styles.mainSection}>
        <piral.Restriction privilege="View Patients">
          <div className={styles.searchLinkArea}>
            <Link
              to="/patient-search"
              className={`omrs-link omrs-outlined-action omrs-rounded ${styles.dashboardLink}`}>
              <SearchIcon className="omrs-icon" fill="var(--omrs-color-interaction)" />
              <span className={styles.label}>Search for patient</span>
            </Link>
          </div>
          {buttons.enabled && (
            <div className={styles.buttonArea}>
              <piral.Extension
                name="home-dashboard"
                render={(nodes) => (
                  <>
                    {nodes.map((node, i) => (
                      <div key={i} className={`omrs-filled-neutral ${styles.homeDashboardBox}`}>
                        {node}
                      </div>
                    ))}
                  </>
                )}
              />
            </div>
          )}
        </piral.Restriction>
      </section>
    </div>
  );
};

export default Home;
