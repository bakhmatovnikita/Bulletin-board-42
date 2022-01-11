import React from 'react';
import upvote_count from '../components/imge/like/Vector_G.svg';
import downvote_count from '../components/imge/like/Vector_B.svg';
import styles from '../HomePage/PostItem/PostItem.module.css';

const PostModal = ({ active, setActive, activePost }) => {
  return (
    <div
      className={active ? styles.modal + ' ' + styles.modal_active : styles.modal}
      onClick={() => setActive(false)}>
      {active && (
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <div className={styles.listGroupItem} key={activePost.id}>
            <img
              className={styles.postsImage}
              src={'https://mockapi.42.works/' + activePost.cover_image.url}
              alt="post-img"

            />
            <div className={styles.postContent}>
              <div className={styles.postName}>
                <h2 className={styles.postTitle}>{activePost.title}</h2>
                <p className={styles.postEmail}>
                  posted_by:{' '}
                  <a href={`mailto:${activePost.posted_by.email}`}>
                    {activePost?.posted_by?.email}
                  </a>
                </p>
              </div>

              <p className={styles.content}> {activePost.content} </p>
              <div className={styles.postLike}>
                <img className={styles.like} src={upvote_count} alt="upvote_count" />
                {activePost.upvote_count}
                <img className={styles.like} src={downvote_count} alt="downvote_count" />
                {activePost.downvote_count}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostModal;
