

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface EcoActionPageProps {
  onBackToHome: () => void;
}

export default function EcoActionPage({ onBackToHome }: EcoActionPageProps) {
  return (
    <div style={{ color: 'black', padding: 40 }}>
      <button onClick={onBackToHome}>Orqaga</button>
      <h1>EcoActionPage ishlayapti!</h1>
    </div>
  );
}