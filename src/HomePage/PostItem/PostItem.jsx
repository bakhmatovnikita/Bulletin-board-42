import React from 'react';

import styles from './PostItem.module.css';
import upvote_count from '../../components/imge/like/Vector_G.svg';
import downvote_count from '../../components/imge/like/Vector_B.svg';

const PostItem = ({ list, setActive, setActivePost }) => {
  const handleModalActivePost = (item) => {
    setActivePost(item);
    setActive(true);
  };
  console.log(list);
  return (
    <div className={styles.listItem}>
      {list.map((item) => (
        <div className={styles.listGroupItem} key={item.id}>
          <img
            className={styles.postsImage}
            src={'https://mockapi.42.works/' + item.cover_image.url}
            alt="post-img"
            onClick={() => handleModalActivePost(item)}
          />
          <div className={styles.postContent}>
            <div className={styles.postName}>
              <h2 className={styles.postTitle}>{item.title}</h2>
              <p className={styles.postEmail}>
                posted_by: <a href={`mailto:${item.posted_by.email}`}>{item.posted_by.email}</a>
              </p>
            </div>

            <p className={styles.content}> {item.content} </p>
            <div className={styles.postLike}>
              <img className={styles.like} src={upvote_count} alt="upvote_count" />
              {item.upvote_count}
              <img className={styles.like} src={downvote_count} alt="downvote_count" />
              {item.downvote_count}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostItem;
