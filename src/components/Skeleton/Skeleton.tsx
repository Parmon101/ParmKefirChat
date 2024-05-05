import styled from "styled-components";

interface SkeletonProps {
  width?: string,
  height?: string,
  radius?: string;
}

const SkeletonStyles = styled.div<SkeletonProps>`
  background-color: rgb(255, 255, 255, 0.2);
  width: ${(props) => props.width ? props.width : "100%"};
  height: ${(props) => props.height ? props.height : "20px"};
  border-radius: ${(props) => props.radius ? props.radius : "12px"};
`;

export const Skeleton = ({ width, height, radius }: SkeletonProps) => {
  return <SkeletonStyles width={width} height={height} radius={radius} />;
};
