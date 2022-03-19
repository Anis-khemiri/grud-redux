import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, deletePost, updatePost } from "../redux/postsSlice";

export default function () {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDesc, setUpdateDesc] = useState("");
  const [isedit, setIsEdit] = useState(false);
  const [id, setId] = useState(null);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items);
  return (
    <div>
      <div className="form">
        <input
          type="text"
          value={title}
          placeholder="enter post title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={desc}
          placeholder="enter Desc"
          onChange={(e) => setDesc(e.target.value)}
        />
        <button
          onClick={() => {
            dispatch(
              addPost({ id: posts.length + 1, title: title, desc: desc })
            );
            setTitle("");
            setDesc("");
          }}
        >
          Add Post
        </button>
      </div>
           
      <div className="posts">
        {posts.length > 0
          ? posts.map((post) => (
              <div key={post.id} className="post">
                <h2>{post.title}</h2>
                <p>{post.desc}</p>
                <button
                  onClick={() => {
                    setIsEdit(true)
                    setId(post.id)
                  }}
                >
                  Edit
                </button>
                <button onClick={() => dispatch(deletePost(post.id))}>
                  Delete
                </button>
               
                <br></br>
                 {isedit && post.id == id && (
          <>
            <input type="text" 
            placeholder="update Title" 
            onChange={(e)=>setUpdateTitle(e.target.value)}/>
            <input type="text"
             placeholder="update Description"
             onChange={(e)=>setUpdateDesc(e.target.value)} />
            <button onClick={()=>{
          dispatch(updatePost({id: id, title: updateTitle, desc: updateDesc}))
          setIsEdit(false)
            }}
            >update</button>
          </>
        )}
         
              </div>
            )) : "there is no post"}
            
            
      </div>
    </div>
    
  );
}
