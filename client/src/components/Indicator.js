import React from 'react';

import CircularGauge, {
  Geometry,
  Scale,
  Size,
  ValueIndicator
} from 'devextreme-react/circular-gauge';

export default function Indicator(props) {
  return (
    <CircularGauge value={props.value}>
      <Size width={90} height={90} />
      <Scale
        startValue={props.inverted ? 100 : 0}
        endValue={props.inverted ? 400 : (props.scale) ? 400 : 6000}
        tickInterval={(props.scale) ? 100 : 1000}

      />
      <Geometry startAngle={props.startAngle} endAngle={props.endAngle} />
      <ValueIndicator color={props.color} />
    </CircularGauge>
  );
}