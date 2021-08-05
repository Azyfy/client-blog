import './App.scss';
import { useState, useEffect } from 'react';
import axios from "axios";
import './spinner.css';
import './reset.css';
import Comments from "./components/Comments"

function App() {

  const [ posts, setPosts ] = useState([]);
  const [ comments, setComments ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {

    function getPosts() {
      return axios.get("http://localhost:3001/blog");
    }

    function getComments() {
      return axios.get("http://localhost:3001/blog/comments");
    }

    Promise.all([getPosts(), getComments()])
        .then(function (results) {
          const returnedPosts = results[0].data;
          const returnedComments = results[1].data;

          setPosts(returnedPosts);
          setComments(returnedComments);
          setLoading(false);
        }).catch(error => {
          console.error(error.message)
        });

  }, []);

  function createMarkup(markup) {
    return {__html: markup};
  }

  function htmlDecode(content) {
    let e = document.createElement('div');
    e.innerHTML = content;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  return (
    <div className="App">
      <h1 id="maintitle" style={{textAlign: "center" }}>Blog</h1>
      {(loading === true) ? (
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      ) : (
      <div>
        { posts.map( post => {
          return (
            <div key={post._id} className="blogpost">
              <h4 > {post.title} </h4>
              <div className="textarea" dangerouslySetInnerHTML={(createMarkup(htmlDecode(post.text)))}></div>

              <Comments comments={comments} post={post} />

              
            </div>
          );
        }) }

      </div> )}
    </div>
  );
}

export default App;
