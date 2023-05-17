import React from 'react';
const Spline = React.lazy(() => import('@splinetool/react-spline'));
import { Suspense } from 'react';
import { ClipLoader } from 'react-spinners';

export default function SplineTool() {
  return (
    <Suspense fallback={<div style={{backgroundColor:'red'}}>Loading....</div>}>
    <Spline scene="https://prod.spline.design/xy4clxqFPRT9Noqa/scene.splinecode" />
    </Suspense>
  );
}
