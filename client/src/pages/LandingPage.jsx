import React from 'react'
import { motion } from "framer-motion"
import HeroPage from "../components/Landingpage/HeroPage"
import FeatureSection from '../components/Landingpage/FeatureSection'
import CTA from '../components/Landingpage/CTA'
import FooterSection from '../components/Landingpage/FooterSection'

const LandingPage = () => {
  return (
    <div className='w-full min-h-[100vh] flex flex-col items-center ' >
      <HeroPage/>
      <FeatureSection/>
      <CTA/>
      <FooterSection/>
    </div>
  )
}

export default LandingPage