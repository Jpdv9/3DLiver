import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Routes, Route} from 'react-router'
import Home from './pages/home/Home'
import Quiz from './pages/quiz/Quiz'
import NotFound from './pages/not-found/NotFound'
import Contact from './pages/contact/Contact'
import Resources from './pages/resources/Resources'
import AboutUs from './pages/about-us/AboutUs'
import Liver from './pages/liver/Liver'
import LiverCancer from './pages/liver/liver-cancer/LiverCancer'
import ViralHepatitis from './pages/liver/viral-hepatitis/ViralHepatitis'
import Layout from './layout/Layout'
import LiverCirrhosis from './pages/liver/liver-cirrhosis/LiverCirrhosis'
import FattyLiver from './pages/liver/fatty-liver/FattyLiver'



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route index path='/' element = {<Home/>}/>
        <Route path='quiz' element = {<Quiz/>}/>
        <Route path='*' element = {<NotFound/>}/>
        <Route path='contacto' element={<Contact/>}/>
        <Route path='recursos' element={<Resources/>}/>
        <Route path='sobre-nosotros' element={<AboutUs/>}/>
        <Route path='higado' element = {<Liver/>}/>
        <Route path='higado/cancer-higado' element = {<LiverCancer/>}/>
        <Route path='higado/hepatitis-viral' element = {<ViralHepatitis/>}/>
        <Route path='higado/cirrosis-hepatica' element = {<LiverCirrhosis/>}/>
        <Route path='higado/higado-graso' element = {<FattyLiver/>}/>
      </Routes>
    </Layout>
  </BrowserRouter>
)
