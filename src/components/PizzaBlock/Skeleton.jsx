import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={471}
    viewBox="0 0 280 471"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="140" cy="140" r="110" /> 
    <rect x="0" y="273" rx="7" ry="7" width="280" height="27" /> 
    <rect x="0" y="317" rx="7" ry="7" width="280" height="88" /> 
    <rect x="0" y="430" rx="7" ry="7" width="90" height="27" /> 
    <rect x="124" y="419" rx="28" ry="28" width="152" height="50" /> 
    <rect x="57" y="439" rx="0" ry="0" width="4" height="10" />
  </ContentLoader>
)

export default Skeleton;