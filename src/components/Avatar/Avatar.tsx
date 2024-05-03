import styled from 'styled-components';
import cn from 'classnames';

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
}

const StyledAvatar = styled.img<AvatarProps>`
  border-radius: 50%;

  @media screen and (max-width: 562px) {
    width: 40px;
    height: 40px;
  }
`;

export const Avatar = ({ className, src, size = 100, alt = 'avatar' }: AvatarProps) => {
  return (
    <StyledAvatar
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn('Avatar', className)}
    />
  );
};
