import React, { useState } from 'react';

const CommentForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newComment = { title, body };
    localStorage.setItem('comments', JSON.stringify([...getComments(), newComment]));
    setTitle('');
    setBody('');
  };

  const getComments = () => {
    const comments = localStorage.getItem('comments');
    return comments ? JSON.parse(comments) : [];
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Body"
        required
      />
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default CommentForm;
