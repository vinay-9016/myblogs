'use client'
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function addBlogs() {


    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const fulldate = `${year}-${month}-${date}`;

    const [newBlog, setNewBlog] = useState({ blogUploadDate: fulldate });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBlog({ ...newBlog, [name]: value });
    }

    const addBlog = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/AddToBlogs", newBlog)
            .then(result => {
                window.location.reload();
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="container p-4 mx-auto my-auto w-full h-full">
            <form onSubmit={addBlog} className="max-w-md mx-auto my-4">
                <div>
                    <div>
                        <label htmlFor="blog_title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blog Title</label>
                        <input type="text" name="blogTitle" id="blog_title" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Blog Title" required />
                    </div>
                </div>
                <div className="my-4">
                    <div>
                        <label htmlFor="blog_author" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blog Author</label>
                        <input type="text" id="blog_author" onChange={handleChange} name="blogAuthor" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Blog Author" required />
                    </div>
                </div>
                <div className="my-4">
                    <div>
                        <label htmlFor="blog_content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blog Content</label>
                        <textarea id="blog_content" onChange={handleChange} rows="4" name="blogDescription" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Blog Description Here..."></textarea>
                    </div>
                </div>

                <div className="my-4 flex justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                        Add Blog
                    </button>
                </div>
            </form>
        </div>
    );
}