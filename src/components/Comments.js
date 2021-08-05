import { useState } from 'react';
import axios from "axios"

const Comments = ({ comments, post }) => {
    const [ filteredComments, setFilteredComments ] = useState(comments.filter(comment => comment.blogpost._id === post._id))
    const [ show, setShow ] = useState(5)
    const [ comment, setComment ] = useState("");
    const [ user, setUser ] = useState("");

    function handleChangeUser (e) {
        setUser(e.target.value);
      }
    
      function handleChangeComment (e) {
        setComment(e.target.value);
      }
    
      function handleSubmit (e) {
        e.preventDefault()
    
        const newComment = {
          blogpost: e.target.dataset.blogpost,
          isadmin: false,
          user,
          comment
        }
    
        axios.post("http://localhost:3001/blog/comments", newComment)
        .then( (res) => {
          setFilteredComments(filteredComments.concat(res.data))
        })
        .catch( (err) => {
          console.log(err)
        });
      }

    return(
        <div >
            {filteredComments.slice(0, show).map( comment => {
                return (                       
                    <div key={comment._id} className="blogcomment">
                      <h6 >{comment.user}</h6>
                      <p >{comment.comment}</p>
                    </div>
                    );
                } )  }

            {(filteredComments.length > show) ?
                <button id="show-btn" onClick={() => { setShow(show+5) }} >ShowMore</button>
                    : 
                    <></>
                    }

            <form onSubmit={handleSubmit} data-blogpost={post._id}>
                <input  onChange={handleChangeUser} type="text" id="user" name="user" placeholder="Optional username" />
                <input  onChange={handleChangeComment} type="text" id="comment" name="comment" placeholder="Your comment" required />       
                <button >OK</button>
            </form>
        </div>
    )
}

export default Comments