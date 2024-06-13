'use client'
import { useState, useEffect } from "react";
import axios from "axios";

export default function updateBlog({ params }) {

    const [newBlog, setNewBlog] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBlog({ ...newBlog, [name]: value });
    }

    useEffect(() => {
        axios.get('http://localhost:3001/getBlog/' + params.blogId)
            .then(res => {
                setNewBlog(res.data);
            })
            .catch(err => console.log(err))
    }, [params.blogId]);

    const updateBlog = async (e) => {
        e.preventDefault();
        axios.put("http://localhost:3001/UpdateToBlog/" + params.blogId, newBlog)
            .then(result => {
                console.log(result)
            })
            .catch(err => console.log(err))
    }


    return (
        <div className="container p-4 mx-auto my-auto w-full h-full">
            <form onSubmit={updateBlog} className="max-w-md mx-auto my-4">
                <div>
                    <div>
                        <label htmlFor="blog_title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blog Title</label>
                        <input type="text" name="blogTitle" id="blog_title" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Blog Title" value={newBlog.blogTitle} />
                    </div>
                </div>
                <div className="my-4">
                    <div>
                        <label htmlFor="blog_author" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blog Author</label>
                        <input type="text" id="blog_author" onChange={handleChange} name="blogAuthor" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Blog Author" value={newBlog.blogAuthor} />
                    </div>
                </div>
                <div className="my-4">
                    <div>
                        <label htmlFor="blog_content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blog Content</label>
                        <textarea id="blog_content" onChange={handleChange} rows="4" name="blogDescription" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Blog Description Here..." value={newBlog.blogDescription}></textarea>
                    </div>
                </div>

                <div className="my-4 flex justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                        Update Blog
                    </button>
                </div>
            </form>
        </div>
    );
}