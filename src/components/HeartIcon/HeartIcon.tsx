interface HeartIconProps {
  isActive: boolean;
  onClick: () => void;
  borderColorActive: string;
  borderColorNoActive: string;
  fillActive: string;
  fillNoActive: string;
}

export const HeartIcon = ({
  isActive,
  onClick,
  borderColorActive,
  borderColorNoActive,
  fillActive,
  fillNoActive,
}: HeartIconProps) => (
  <svg
    width="19.000000"
    height="18.000000"
    viewBox="0 0 19 18"
    fill={isActive ? fillActive : fillNoActive}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    onClick={onClick}
  >
    <defs>
      <linearGradient
        id="paint_linear_5_5_0"
        x1="-231.085236"
        y1="-7.853119"
        x2="-227.625824"
        y2="21.281290"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#D44F4F" />
        <stop offset="1.000000" stop-color="#B43333" />
      </linearGradient>
      <linearGradient
        id="paint_linear_5_5_1"
        x1="-231.085236"
        y1="-7.853119"
        x2="-227.625824"
        y2="21.281290"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#59D44F" />
        <stop offset="1.000000" stop-color="#36B433" />
      </linearGradient>
      <linearGradient
        id="paint_linear_5_5_2"
        x1="-231.085236"
        y1="-7.853119"
        x2="-227.625824"
        y2="21.281290"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#D44F4F" />
        <stop offset="1.000000" stop-color="#B43333" />
      </linearGradient>
    </defs>

    <path
      id="Vector"
      d="M0.15 6.96C-0.2 5.47 -0.1 2.72 1.95 1.45C6.45 -1.37 8.97 2.95 8.97 2.95L9.02 2.95C9.02 2.95 11.54 -1.37 16.04 1.45C18.09 2.72 18.19 5.47 17.84 6.96C17.37 8.98 15.93 10.26 14.11 12.17C9 17 9 17 9 17C9 17 9 17 3.88 12.17C2.06 10.26 0.62 8.98 0.15 6.96Z"
      stroke={isActive ? borderColorActive : borderColorNoActive}
      stroke-opacity="1.000000"
      stroke-width="1.000000"
    />
  </svg>
);



