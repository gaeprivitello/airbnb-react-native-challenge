import Svg, { G, Rect, Defs } from 'react-native-svg';

function Marker() {
  return (
    <Svg width={25} height={25} viewBox="0 0 14 14" fill="none">
      <G filter="url(#filter0_d_9001_53280)">
        <Rect
          x={1.50903}
          y={0.754517}
          width={10.3863}
          height={10.3863}
          rx={5.19316}
          fill="#B5425C"
        />
        <Rect
          x={2.04626}
          y={1.29174}
          width={9.31187}
          height={9.31187}
          rx={4.65593}
          stroke="#fff"
          strokeWidth={1.07445}
        />
      </G>
      <Defs></Defs>
    </Svg>
  );
}

export default Marker;
