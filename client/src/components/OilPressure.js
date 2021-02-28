import React from 'react';

import CircularGauge, {
  Geometry,
  Scale,
  Size,
  ValueIndicator
} from 'devextreme-react/circular-gauge';

export default function OilPressure(props) {
  console.log(props)
  return (
    <CircularGauge value={props.value}>
      <Size width={90} height={90} />
      <Scale
        startValue={props.inverted ? 0 : 0}
        endValue={props.inverted ? (props.scale) ? 10 : 90 : 90}
        tickInterval={(props.scale) ? 2 : 10}
      />
      <Geometry startAngle={props.startAngle} endAngle={props.endAngle} />
      <ValueIndicator color={props.color} />
    </CircularGauge>
  );
}