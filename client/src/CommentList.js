import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CommentList = ({ postID }) => {

    const [comments, setComments] = useState([]) // API sends us an array of comments

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`http://localhost:4001/posts/${postID}/comments`)

            setComments(res.data)
        }

        fetchData()

    }, [postID])

    const renderedComments = comments.map(comment => {
        return <li className="" key={comment.id}>
            {comment.content}
        </li>
    })

    return <ul>
        {renderedComments}
    </ul>
}

export default CommentList
