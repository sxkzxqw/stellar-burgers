import React, { useState, useEffect } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import './App.module.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import HomePage from '../../../pages/HomePage';
import LoginPage from '../../../pages/LoginPage';
import RegisterPage from '../../../pages/RegisterPage';
import ForgotPasswordPage from '../../../pages/ForgotPasswordPage';
import ProfilePage from '../../../pages/ProfilePage';
import PageNotFound from '../../../pages/PageNotFound';
import IngredientPage from '../../../pages/IngredientPage';
import { clearCurrentIngredient, getIngredients } from '../../../services/features/BurgerIngredientsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserAuth } from '../../../services/features/UserSlice';
import { ProtectedRoute } from '../../../protectedRoutes/profileRoute';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import ResetPasswordPage from '../../../pages/ResetPasswordPage';
import { useAppDispatch } from '../../../utils/types/hook';
function App() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const background = location.state?.background;
  useEffect(function () {
    dispatch(getIngredients())
  }, [dispatch])

  useEffect(() => {
    dispatch(checkUserAuth())
  }, [dispatch])

  function handleCloseModal() {
    dispatch(clearCurrentIngredient())
    navigate(background.pathname || "/", { replace: true })
  }
  const isFromForgotPassword = location.state?.fromForgotPassword;

  return (
    <div className="App">
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<HomePage />} />
        <Route path='login' element={<ProtectedRoute onlyUnAuth>
          <LoginPage />
        </ProtectedRoute>} />
        <Route path='register' element={<ProtectedRoute onlyUnAuth>
          <RegisterPage />
        </ProtectedRoute>} />
        <Route path='forgot-password' element={<ProtectedRoute onlyUnAuth>
          <ForgotPasswordPage />
        </ProtectedRoute>} />
        {isFromForgotPassword && (
          <Route
            path="/reset-password"
            element={
              <ProtectedRoute onlyUnAuth>
                <ResetPasswordPage />
              </ProtectedRoute>
            }
          />
        )}
        <Route path='profile' element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='*' element={<PageNotFound />} />
        <Route path='ingredients/:id' element={<IngredientPage />} />
      </Routes>
      {background &&
        <Routes>
          <Route path='ingredients/:id' element={
            <Modal handleClick={handleCloseModal}>
              {<IngredientDetails />}
            </Modal>
          } />
        </Routes>
      }
    </div>
  );
}

export default App;
