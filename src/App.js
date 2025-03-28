import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import StudentDashboard from './components/student/StudentDashboard';

// יצירת נתיבים ברמה הגבוהה
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/teacher/*',
    element: <TeacherDashboard />
  },
  {
    path: '/student/*',
    element: <StudentDashboard />
  }
]);

function App() {
  return (
    <AuthProvider>
      <div className="app" dir="rtl">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
}

export default App;