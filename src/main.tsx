import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { LoadingOutlined } from "@ant-design/icons";

import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthProvider from './contexts/Auth.tsx'
import SignIn from './app/Signin.tsx';
import Tester from './app/Tester.tsx';
import Question from './app/Question.tsx';
import Result from './app/Result.tsx';

// test account : { 0972289587, 123456ab }

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthProvider>
            <Suspense fallback={<LoadingOutlined />}>
                <BrowserRouter>
                    <Routes>
                        <Route index path='/' element={<App />} />
                        <Route path='signin' element={<SignIn />} />
                        <Route path='tester' element={<Tester />} />
                        <Route path='tester/:exam/:section/:idx' element={<Question />} />
                        <Route path='result/:exam/:section' element={<Result />} />
                        <Route path='*' element={<div className='page'>
                            <p>Error 404</p>
                        </div>} />
                    </Routes>
                </BrowserRouter>
            </Suspense>
    </AuthProvider>
    ,
)
