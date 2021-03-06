import React from 'react';

const SvgLoading = (props) => (
  <svg
    className="loading_svg__lds-spinner"
    width={200}
    height={200}
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    style={{
      background: '0 0',
    }}
    {...props}
  >
    <rect x={48} y={12.5} rx={4.8} ry={1.25} width={4} height={15} fill="#40d5bb">
      <animate
        attributeName="opacity"
        values="1;0"
        dur="0.6s"
        begin="-0.5499999999999999s"
        repeatCount="indefinite"
      />
    </rect>
    <rect
      x={48}
      y={12.5}
      rx={4.8}
      ry={1.25}
      width={4}
      height={15}
      fill="#40d5bb"
      transform="rotate(30 50 50)"
    >
      <animate
        attributeName="opacity"
        values="1;0"
        dur="0.6s"
        begin="-0.5s"
        repeatCount="indefinite"
      />
    </rect>
    <rect
      x={48}
      y={12.5}
      rx={4.8}
      ry={1.25}
      width={4}
      height={15}
      fill="#40d5bb"
      transform="rotate(60 50 50)"
    >
      <animate
        attributeName="opacity"
        values="1;0"
        dur="0.6s"
        begin="-0.44999999999999996s"
        repeatCount="indefinite"
      />
    </rect>
    <rect
      x={48}
      y={12.5}
      rx={4.8}
      ry={1.25}
      width={4}
      height={15}
      fill="#40d5bb"
      transform="rotate(90 50 50)"
    >
      <animate
        attributeName="opacity"
        values="1;0"
        dur="0.6s"
        begin="-0.39999999999999997s"
        repeatCount="indefinite"
      />
    </rect>
    <rect
      x={48}
      y={12.5}
      rx={4.8}
      ry={1.25}
      width={4}
      height={15}
      fill="#40d5bb"
      transform="rotate(120 50 50)"
    >
      <animate
        attributeName="opacity"
        values="1;0"
        dur="0.6s"
        begin="-0.35000000000000003s"
        repeatCount="indefinite"
      />
    </rect>
    <rect
      x={48}
      y={12.5}
      rx={4.8}
      ry={1.25}
      width={4}
      height={15}
      fill="#40d5bb"
      transform="rotate(150 50 50)"
    >
      <animate
        attributeName="opacity"
        values="1;0"
        dur="0.6s"
        begin="-0.3s"
        repeatCount="indefinite"
      />
    </rect>
    <rect
      x={48}
      y={12.5}
      rx={4.8}
      ry={1.25}
      width={4}
      height={15}
      fill="#40d5bb"
      transform="rotate(180 50 50)"
    >
      <animate
        attributeName="opacity"
        values="1;0"
        dur="0.6s"
        begin="-0.25s"
        repeatCount="indefinite"
      />
    </rect>
    <rect
      x={48}
      y={12.5}
      rx={4.8}
      ry={1.25}
      width={4}
      height={15}
      fill="#40d5bb"
      transform="rotate(210 50 50)"
    >
      <animate
        attributeName="opacity"
        values="1;0"
        dur="0.6s"
        begin="-0.19999999999999998s"
        repeatCount="indefinite"
      />
    </rect>
    <rect
      x={48}
      y={12.5}
      rx={4.8}
      ry={1.25}
      width={4}
      height={15}
      fill="#40d5bb"
      transform="rotate(240 50 50)"
    >
      <animate
        attributeName="opacity"
        values="1;0"
        dur="0.6s"
        begin="-0.15s"
        repeatCount="indefinite"
      />
    </rect>
    <rect
      x={48}
      y={12.5}
      rx={4.8}
      ry={1.25}
      width={4}
      height={15}
      fill="#40d5bb"
      transform="rotate(270 50 50)"
    >
      <animate
        attributeName="opacity"
        values="1;0"
        dur="0.6s"
        begin="-0.09999999999999999s"
        repeatCount="indefinite"
      />
    </rect>
    <rect
      x={48}
      y={12.5}
      rx={4.8}
      ry={1.25}
      width={4}
      height={15}
      fill="#40d5bb"
      transform="rotate(300 50 50)"
    >
      <animate
        attributeName="opacity"
        values="1;0"
        dur="0.6s"
        begin="-0.049999999999999996s"
        repeatCount="indefinite"
      />
    </rect>
    <rect
      x={48}
      y={12.5}
      rx={4.8}
      ry={1.25}
      width={4}
      height={15}
      fill="#40d5bb"
      transform="rotate(330 50 50)"
    >
      <animate
        attributeName="opacity"
        values="1;0"
        dur="0.6s"
        begin="0s"
        repeatCount="indefinite"
      />
    </rect>
  </svg>
);

export default SvgLoading;
