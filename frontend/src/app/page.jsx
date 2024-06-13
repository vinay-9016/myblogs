"use client"
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getBlogs = () => {
    axios.get('http://localhost:3001/')
      .then(res => setBlogs(res.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getBlogs();
  }, []);

  const handleDelete = (id) => {
    axios.delete('http://localhost:3001/deleteBlog/' + id)
      .then(res => {
        getBlogs();
      })
      .catch(err => console.log(err));
  }

  const filteredBlogs = blogs.filter((o) => {
    return o.blogTitle && o.blogTitle.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const records = filteredBlogs.slice(firstIndex, lastIndex);
  const npage = Math.ceil(filteredBlogs.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const prePage = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  }
  const nextPage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1)
    }
  }
  const changeCpage = (id) => {
    setCurrentPage(id);
  }

  return (
    <>
      <div className="container px-4">
        <div className="search-blogs">

          <div className="max-w-md mx-auto my-4">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLineCap="round" strokeLineJoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="search" id="searchBlog" name="searchBlog" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search any blog" />
            </div>
          </div>

        </div>
        <div className="grid grid-flow-row-dense grid-cols-3 mx-auto max-w-screen-lg">
          {
            records && records.length > 0 ? (
              records.map(blog => (
                <div key={blog._id} className="my-4 col-span-1 max-w-sm bg-white mx-4 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <Link href="#">
                    <img className="rounded-t-lg" src="https://images.unsplash.com/photo-1595147389795-37094173bfd8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                  </Link>
                  <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{blog.blogTitle}</h5>
                    <p className="mb-3 font-normal text-gray-700 truncate dark:text-gray-400">{blog.blogDescription}</p>

                    <Link href={`/blogDetails/${blog._id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Read more
                      <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLineCap="round" strokeLineJoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                      </svg>
                    </Link>
                    <div className="action-buttons mt-5 flex justify-between">
                      <Link href={`updateBlog/${blog._id}`} className="focus:outline-none w-1/2 text-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Update</Link>

                      <button type="button" className="focus:outline-none text-white w-1/2 text-center ms-4 bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={(e) => handleDelete(blog._id)}>Delete</button>
                    </div>
                  </div>

                </div>
              ))
            ) : (
              <p className='text-white'>No Blogs Found</p>
            )

          }
        </div>

        {
          records && records.length > 0 ? (<nav className="flex justify-center items-center my-4">
            <ul className="flex items-center">
              <li className="page-item">
                <Link href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={prePage}>Prev</Link>
              </li>
              {
                numbers.map((n, i) => (
                  <li className={`py-2 px-5 rounded-xl ${currentPage === n ? 'bg-blue-500' : ''}`} key={i}>
                    <Link href="#" className="page-item" onClick={() => changeCpage(n)}>{n}</Link>
                  </li>
                ))
              }
              <li className="page-item">
                <Link href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ms-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={nextPage}>Next</Link>
              </li>
            </ul>
          </nav>
          ) : ''
        }

      </div >
    </>
  );
}
