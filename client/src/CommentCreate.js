import React, { useState } from 'react'
import axios from 'axios'

const CommentCreate = ({ postID }) => {

    const [content, setContent] = useState('')

    const onSubmit = async (event) => {
        event.preventDefault()

        await axios.post(`http://blog.com/posts/${postID}/comments`, {
            content
        })

        setContent('')

        console.log()
    }

    return (
        <div>
            <form action="" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="">New Comment</label>
                    <input type="text" className='form-control' value={content} onChange={e => setContent(e.target.value)} />
                </div>
                <button className='btn btn-primary'>Submit</button>
            </form>
        </div>
    )

}

export default CommentCreate
