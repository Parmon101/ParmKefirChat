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
  object-fit: cover;

  // INFO добавил вне макета, что бы аватар не сильно сливался с задним фоном
  border: 1px solid rgb(255, 255, 255, 0.2);

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
