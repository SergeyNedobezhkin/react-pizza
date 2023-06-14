import React from "react";
import ContentLoader from "react-content-loader";

function SkeletonLoader() {
  return (
    <ContentLoader
      speed={0}
      width={280}
      height={465}
      viewBox="0 0 280 465"
      backgroundColor="#f0f0f0"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="138" cy="138" r="138" />
      <rect x="-1" y="286" rx="0" ry="0" width="275" height="32" />
      <rect x="0" y="336" rx="0" ry="0" width="275" height="56" />
      <rect x="0" y="404" rx="0" ry="0" width="90" height="27" />
      <rect x="164" y="403" rx="14" ry="14" width="110" height="35" />
    </ContentLoader>
  );
}

export default SkeletonLoader;
