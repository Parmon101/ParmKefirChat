interface HeartIconProps {
  width?: number;
  height?: number;
  isActive: boolean;
  onClick: () => void;
  borderColorActive: string;
  borderColorNoActive: string;
  fillActive: string;
  fillNoActive: string;
}

export const HeartIcon = ({
  width = 20,
  height = 19,
  isActive,
  onClick,
  borderColorActive,
  borderColorNoActive,
  fillActive,
  fillNoActive,
}: HeartIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={isActive ? fillActive : fillNoActive} onClick={onClick}>
    <path
      id="Vector"
      d="M4.882 13.172C3.07 11.26 1.622 9.986 1.154 7.969.806 6.47.909 3.73 2.95 2.453c4.5-2.815 7.022 1.504 7.022 1.504h.056s2.521-4.32 7.022-1.504c2.04 1.276 2.144 4.017 1.796 5.516-.467 2.017-1.916 3.291-3.728 5.203C10 18 10.003 18.005 10 18l-5.118-4.828Z"
      stroke={isActive ? borderColorActive : borderColorNoActive}
    />
  </svg>
);
