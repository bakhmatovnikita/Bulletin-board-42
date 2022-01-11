import React, { useState } from 'react';
import PostItem from './PostItem/PostItem';

import styles from './HomePage.module.css';

const Posts = (props) => {
  if (props.loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className={`${styles.listGroup} ${styles.mb_2}`}>
      <PostItem list={props.list} setActive={props.setActive} setActivePost={props.setActivePost} />
    </div>
  );
};

export default Posts;
