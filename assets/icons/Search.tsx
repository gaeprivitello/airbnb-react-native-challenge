import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function Search(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M6.43 12.854a6.415 6.415 0 003.943-1.353l4.25 4.25a.8.8 0 001.13-1.13l-4.25-4.25a6.427 6.427 0 10-5.072 2.483zM3.016 3.014a4.83 4.83 0 110 6.83 4.813 4.813 0 010-6.83z"
        fill="#C74865"
      />
    </Svg>
  );
}

export default Search;
