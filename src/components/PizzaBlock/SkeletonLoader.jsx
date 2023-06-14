import React from "react";
import ContentLoader from "react-content-loader";

function SkeletonLoader(props) {
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
      <circle cx="125" cy="125" r="125" />
      <rect x="0" y="270" rx="0" ry="0" width="275" height="32" />
      <rect x="0" y="316" rx="0" ry="0" width="275" height="56" />
      <rect x="0" y="388" rx="0" ry="0" width="90" height="27" />
      <rect x="164" y="387" rx="14" ry="14" width="110" height="35" />
    </ContentLoader>
  );
}

export default SkeletonLoader;
