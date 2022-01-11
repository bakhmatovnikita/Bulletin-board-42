import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Image from '../components/imge/header/logo/50x50.png';
import { alertActions, userActions } from '../_actions';

import styles from './HeaderPage.module.css';

class HeaderPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`${styles.col_sm_6} ${styles.col_sm_offset_4}`}>
        <div className={styles.headerLogo}>
          <img className={styles.imageHeader} src={Image} alt="logo" />
          <h3>BUY PLEASE</h3>
        </div>
        <div className={styles.searchLogin}>
          <form className={styles.searchForm}>
            <input
              type="text"
              className={styles.formSearch}
              name="search"
              placeholder="Search"
              onChange={(event) => this.props.setValue(event.target.value)}
            />
          </form>
          {this.props.loggedIn ? (
            <>
              <Link to="/login" className={styles.btnHeader}>
                LOG OUT
              </Link>
              <button
                onClick={this.props.toggleOpenNewPostModal}
                className={`${styles.btn} ${styles.btnPrimary}`}>
                Create your listing
              </button>
            </>
          ) : (
            <Link to="/login" className={styles.btnHeader}>
              LOG IN
            </Link>
          )}
        </div>
      </div>
    );
  }
}
function mapState(state) {
  const { alert, authentication } = state;
  return { alert, authentication };
}
const actionCreators = {
  clearAlerts: alertActions.clear,
};

const connectedHeaderPage = connect(mapState, actionCreators)(HeaderPage);
export { connectedHeaderPage as HeaderPage };
