import React from 'react';

import CircularGauge, {
  Geometry,
  Scale,
  Size,
  ValueIndicator
} from 'devextreme-react/circular-gauge';

export default function CoolantTemp(props) {
  return (
    <CircularGauge value={props.value}>
      <Size width={90} height={90} />
      <Scale
        startValue={props.inverted ? 0 : 0}
        endValue={props.inverted ? (props.scale) ? 120 : 200 : 120}
        tickInterval={(props.scale) ? 50 : 20}
      />
      <Geometry startAngle={props.startAngle} endAngle={props.endAngle} />
      <ValueIndicator color={props.color} />
    </CircularGauge>
  );
}