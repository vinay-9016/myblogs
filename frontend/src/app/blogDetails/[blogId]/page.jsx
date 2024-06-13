'use client'
import axios from "axios";
import { useEffect, useState } from "react";
export default function blogDetails({ params }) {

    const [blog, setBlog] = useState({});
    const [comments, setComments] = useState([]);

    const [newComment, setNewComment] = useState({ blogId: params.blogId });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewComment({ ...newComment, [name]: value });
    }

    const addComment = (e) => {
        e.preventDefault();

        axios.post("http://localhost:3001/AddComment", newComment)
            .then(result => {
                setNewComment({ blogComment: '' });
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get('http://localhost:3001/getBlog/' + params.blogId)
            .then(res => {
                setBlog(res.data);
            })
            .catch(err => console.log(err))
    }, [params.blogId]);

    useEffect(() => {
        axios.get('http://localhost:3001/getComments/' + params.blogId)
            .then(res => {
                setComments(res.data);
            })
            .catch(err => console.log(err))
    }, [addComment]);

    return (
        <div className="container my-4">
            <div className="row">
                <div className="img h-1/2 w-1/2 mx-auto rounded-lg">
                    <img className="rounded-lg" src="https://images.unsplash.com/photo-1595147389795-37094173bfd8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                </div>

                <div className="blog-sub-details flex justify-between mx-auto w-1/2">
                    <div className="blog-author">
                        Author: {blog.blogAuthor}
                    </div>
                    <div className="blog-upload-date">
                        {blog.blogUploadDate}
                    </div>
                </div>

                <div className="blog-main-detail w-1/2 mx-auto mt-5">
                    <div className="blog-title text-center font-bold">{blog.blogTitle}</div>
                    <div className="blog-description mt-5">
                        {blog.blogDescription}
                    </div>
                </div>

                <div className="blog-comments w-1/2 mx-auto mt-5">
                    <h2 className="text-3xl">Comments</h2>

                    <div className="comments mt-5">
                        {
                            comments && comments.length > 0 ? (
                                comments.map(comment => (
                                    <div key={comment._id} className="comment flex items-center mt-3">
                                        <div className="avatar w-5 rounded-lg">
                                            <img src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg" className="rounded-lg" alt="" />
                                        </div>
                                        <div className="comment-detail ms-1">
                                            <p>{comment.blogComment}</p>
                                        </div>
                                    </div>
                                ))
                            ) : <p>No comments are added</p>
                        }

                        <form onSubmit={addComment} className="my-4">
                            <input type="text" name="blogComment" id="blogComment" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add your Comment here" onChange={handleChange} required />

                            <button className="bg-blue-500 mt-3 hover:bg-blue-700 text-white py-2 px-4 rounded">
                                Add comment
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}