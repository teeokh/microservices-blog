import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CommentCreate from './CommentCreate'
import CommentList from './CommentList'

const PostList = () => {

    const [posts, setPosts] = useState({})

    const fetchPosts = async () => {
        try {
            const res = await axios.get('http://blog.com/posts')

            setPosts(res.data) // Updates posts with data from res.data (we get back an object of posts)
        } catch (error) {
            console.log('Error fetching posts: ', error.message)
        }

    }

    useEffect(() => {
        fetchPosts()
    }, []) // So function only runs once during component's lifecycle

    const renderedPosts = Object.values(posts).map(post => { // For each post, render based on ID and title
        return <div
            className='card'
            style={{ width: '30%', marginBottom: '20px' }}
            key={post.id}
        >
            <div className="card-body">
                <h3>{post.title}</h3>
                <CommentList comments={post.comments} />
                <CommentCreate postID={post.id} />
            </div>
        </div>
    })

    return (
        <div className='d-flex flex-row flex-wrap justify-content-between'>
            {renderedPosts}
        </div>
    )
}

export default PostList
