import React from 'react';
import axios from 'axios';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { history } from '../_helpers';
import { alertActions } from '../_actions';

import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { HeaderPage } from '../HederPage/HeaderPage';

import styles from './App.module.css';
import NewPost from '../NewPost/NewPost';

function App({ loggedIn }) {
  const [isOpenNewPostModal, setIsOpenNewPostModal] = useState(false);
  const [value, setValue] = useState('');
  const [list, setList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postPerPage] = React.useState(6);
  const [activePost, setActivePost] = React.useState({});
  const [users, setUsers] = useState([]);
  const [modalActive, setModalActive] = useState(false);

  React.useEffect(() => {
    const getList = async () => {
      setLoading(true);
      const res = await axios.get('https://mockapi.42.works/api/posts');

      setList(res.data.data);

      setLoading(false);
    };

    getList();
    const getUsers = async () => {
      const users = await axios.get('https://mockapi.42.works/api/profile');
      setUsers(users.data.data);
    };

    getUsers();
  }, []);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = list
    .filter((item) => {
      return (
        item.title.toLowerCase().includes(value.toLowerCase()) ||
        item.content.toLowerCase().includes(value.toLowerCase())
      );
    })
    .slice(firstPostIndex, lastPostIndex);

  const paginate = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };
  const toggleOpenNewPostModal = () => setIsOpenNewPostModal(!isOpenNewPostModal);

  return (
    <div className={styles.container}>
      <div className={`${styles.col_sm_8} ${styles.col_sm_offset_2}`}>
        <Router history={history}>
          <Route
            exact
            path="/"
            render={(props) => (
              <HeaderPage
                {...props}
                loggedIn={loggedIn}
                toggleOpenNewPostModal={toggleOpenNewPostModal}
                setValue={setValue}
              />
            )}
          />
          {isOpenNewPostModal && <NewPost onClose={toggleOpenNewPostModal} />}
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <HomePage
                  {...props}
                  currentPost={currentPost}
                  loading={loading}
                  setModalActive={setModalActive}
                  modalActive={modalActive}
                  setActivePost={setActivePost}
                  activePost={activePost}
                  postPerPage={postPerPage}
                  totalPost={list.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              )}
            />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

function mapState(state) {
  const {
    authentication: { loggedIn },
  } = state;
  return { loggedIn };
}

const actionCreators = {
  clearAlerts: alertActions.clear,
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };
