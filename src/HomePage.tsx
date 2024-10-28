import React from 'react';

const HomePage: React.FC = () => {
  const getComments = () => {
    const comments = localStorage.getItem('comments');
    return comments ? JSON.parse(comments) : [];
  };

  const comments = getComments();

  return (
    <div>
      <h1>Recent Comments</h1>
      {comments.map((comment: { title: string; body: string }, index: number) => (
        <div key={index}>
          <h2>{comment.title}</h2>
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
