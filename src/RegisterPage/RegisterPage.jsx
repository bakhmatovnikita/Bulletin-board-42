import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

import styles from '../LoginPage/LoginPage.module.css';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: '',
        password: '',
        password_2: '',
        password_has_error: false,
      },
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  checkPassword() {
    if (!this.state.user.password || this.state.user.password != this.state.user.password_2) {
      this.setState({ password_has_error: true });
    } else {
      this.setState({ password_has_error: false });
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState(
      {
        user: {
          ...user,
          [name]: value,
        },
      },
      () => {
        if (name === 'password' || name === 'password_2') this.checkPassword();
      },
    );
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    if (user.username && user.password && user.password_2) {
      this.props.register(user);
    }
  }

  render() {
    const { registering } = this.props;
    const { user, submitted } = this.state;
    return (
      <div className={`${styles.col_md_6} ${styles.col_md_offset_3}`}>
        <h2>SIGN UP</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className={styles.formGroup + (submitted && !user.username ? styles.hasError : '')}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className={styles.formControl}
              name="username"
              value={user.username}
              onChange={this.handleChange}
            />
            {submitted && !user.username && (
              <div className={styles.helpBlock}>Username is required</div>
            )}
          </div>
          <div className={styles.formGroup + (submitted && !user.username ? styles.hasError : '')}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={styles.formControl}
              name="password"
              value={user.password}
              onChange={this.handleChange}
            />
            {submitted && !user.password && (
              <div className={styles.helpBlock}>Password is required</div>
            )}
          </div>
          <div className={styles.formGroup + (submitted && !user.username ? styles.hasError : '')}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={styles.formControl}
              name="password_2"
              value={user.password_2}
              onChange={this.handleChange}
            />
            {submitted && !user.password_2 && (
              <div className={styles.helpBlock}>Password is required</div>
            )}
          </div>
          <div className={styles.formGroup}>
            <button
              disabled={this.state.password_has_error}
              className={`${styles.btn} ${styles.btnPrimary}`}>
              SIGN UP
            </button>
            {registering && (
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            )}
            <Link to="/login" className={`${styles.btn} ${styles.btnLink}`}>
              LOG IN
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

function mapState(state) {
  const { registering } = state.registration;
  return { registering };
}

const actionCreators = {
  register: userActions.register,
};

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
