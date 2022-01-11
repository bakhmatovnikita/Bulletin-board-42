import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import Posts from './Posts';
import Pagination from '../Pogination/Pagination';
import PostModal from '../PostModal/PostModal';

import styles from './HomePage.module.css';

function HomePage(props) {
  return (
    <div className={styles.container}>
      <Posts
        list={props.currentPost}
        loading={props.loading}
        setActive={props.setModalActive}
        active={props.modalActive}
        setActivePost={props.setActivePost}
      />
      <PostModal
        active={props.modalActive}
        setActive={props.setModalActive}
        activePost={props.activePost}
      />
      <Pagination
        postPerPage={props.postPerPage}
        totalPost={props.totalPost}
        paginate={props.paginate}
        currentPage={props.currentPage}
      />
    </div>
  );
}

function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return { user, users };
}

const actionCreators = {
  getUsers: userActions.getAll,
  deleteUser: userActions.delete,
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };
