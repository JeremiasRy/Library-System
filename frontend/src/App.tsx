import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks/reduxHook'
import { getAllBooks } from './redux/reducers/bookReducer';
import { login } from './redux/reducers/userReducer';

function App() {
  const books = useAppSelector(state => state.book);
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user !== null) {
      dispatch(getAllBooks(null));
    } 
  }, [])

  return (
    <div className="App">
    </div>
  )
}

export default App
