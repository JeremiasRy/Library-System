import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';
import { useState, useEffect } from 'react'
import { UserForm } from './components/UserForm';
import { useAppDispatch, useAppSelector } from './hooks/reduxHook'
import { LoginRegister } from './pages/LoginRegister';
import { getAllBooks } from './redux/reducers/bookReducer';
import { login, logout, register } from './redux/reducers/userReducer';

function App() {
  const books = useAppSelector(state => state.book);
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
  }, [])

  console.log(books);
  console.log(user);

  return (
    <div className="App">
      <LoginRegister/>
    </div>
  )
}

export default App
