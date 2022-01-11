import React, { useState } from 'react';
import axios from 'axios';
import styles from './NewPost.module.css';
import styled from 'styled-components';
import array_colse from './../components/imge/array/Icon/arrow-down.svg';

const Button = styled.button`
  padding: 6px 12px;
  color: #fff;
  background-color: #33a0ff;
  border-color: #f4f2f8;
  width: 174px;
  height: 45px;
  font-family: Montserrat;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  text-transform: uppercase;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
`;

const NewPost = (props) => {
  console.log(props);
  const url = 'https://mockapi.42.works/api/posts';
  const [data, setData] = useState({
    title: '',
    content: '',
    cover_image: '',
    is_private: true,
  });

  function submit(e) {
    e.preventDefault();
    axios
      .post(url, {
        title: data.title,
        content: data.content,
        cover_image: data.cover_image,
        is_private: data.is_private,
      })
      .then((res) => {
        console.log(res.data);
      });
  }

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }

  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    this.props.handleFile(fileUploaded);
  };
  return (
    <div className={styles.postСreationWrapper}>
      <div className={styles.newPostModal}>
        <img
          style={{ cursor: 'pointer', marginBottom: -10 }}
          className={styles.arrayColse}
          src={array_colse}
          alt="array_colse"
          onClick={props.onClose}
        />
        <form id="form" onSubmit={(e) => submit(e)}>
          <div className={styles.postCreationForm}>
            <label className={styles.labelForm} htmlFor="Title">
              Title
            </label>
            <input
              onChange={(e) => handle(e)}
              type="text"
              name="input-title"
              className={styles.titleForm}
              id="title"
              value={data.title}
              required
              minLength={5}
              maxLength={120}
            />
            <label className={styles.labelForm} htmlFor="Content">
              Content
            </label>
            <textarea
              onChange={(e) => handle(e)}
              className={styles.contentForm}
              id="content"
              value={data.content}
              name="texteria-content"
              required
              minLength={15}
              maxLength={550}
            />
            <div className={styles.coverImage}>
              <label className={styles.labelForm} htmlFor="Cover image">
                Cover image
              </label>
              <label>
                <Button onClick={handleClick}>Choose file</Button>
                <input
                  type="file"
                  style={{ display: 'none' }}
                  id="cover_image"
                  ref={hiddenFileInput}
                  onChange={(e) => handle(e)}
                  value={data.cover_image}
                  // onChange={handleChange}
                />
              </label>
            </div>
            <label htmlFor="checkbox form" className={`${styles.labelForm} ${styles.checkboxForm}`}>
              <input
                onChange={(e) => handle(e)}
                id="is_private"
                value={data.is_private}
                className={styles.checkbox}
                type="checkbox"
              />
              Can be seen only by logged in users
            </label>
          </div>
          <button onClick={submit} id="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
