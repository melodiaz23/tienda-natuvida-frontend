import React from 'react';


export default function Skeleton() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-dark"></div>
    </div>
  );
}
