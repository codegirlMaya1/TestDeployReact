import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import CommentForm from './CommentForm';

describe('App', () => {
  it('renders the navbar and navigates correctly', () => {
    const { container, getByText } = render(
      <Router>
        <App />
      </Router>
    );

    expect(container.querySelector('nav')).not.toBeNull();
    expect(getByText('Home')).not.toBeNull();
    expect(getByText('New Comment')).not.toBeNull();

    fireEvent.click(getByText('New Comment'));
    expect(getByText('Add Comment')).not.toBeNull();
  });
});

describe('CommentForm', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText } = render(
      <Router>
        <CommentForm />
      </Router>
    );
    expect(getByPlaceholderText('Title')).not.toBeNull();
    expect(getByPlaceholderText('Body')).not.toBeNull();
  });

  it('handles input changes', () => {
    const { getByPlaceholderText } = render(
      <Router>
        <CommentForm />
      </Router>
    );
    const titleInput = getByPlaceholderText('Title') as HTMLInputElement;
    const bodyInput = getByPlaceholderText('Body') as HTMLTextAreaElement;

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(bodyInput, { target: { value: 'Test Body' } });

    expect(titleInput.value).toBe('Test Title');
    expect(bodyInput.value).toBe('Test Body');
  });

  it('submits the form and stores comment in localStorage', () => {
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <CommentForm />
      </Router>
    );
    const titleInput = getByPlaceholderText('Title') as HTMLInputElement;
    const bodyInput = getByPlaceholderText('Body') as HTMLTextAreaElement;
    const submitButton = getByText('Add Comment');

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(bodyInput, { target: { value: 'Test Body' } });
    fireEvent.click(submitButton);

    const comments = JSON.parse(localStorage.getItem('comments') || '[]');
    expect(comments).toEqual([{ title: 'Test Title', body: 'Test Body' }]);
  });
});
