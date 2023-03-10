import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks/reduxHook'
import { getAllBooks } from './redux/reducers/bookReducer';
import { login, logout, register } from './redux/reducers/userReducer';

function App() {
  const books = useAppSelector(state => state.book);
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(register({username: "testDude2", firstname:"Piia", lastname: "Pitkänen", email: "jahas@gmail.com", password: "zuccini"}))
  }, [])

  console.log(books);
  console.log(user);

  return (
    <div className="App">
    </div>
  )
}

export default App
