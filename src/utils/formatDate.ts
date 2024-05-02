export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();

  // Получаем разницу в миллисекундах между текущим временем и временем комментария
  const diffInMilliseconds = now.getTime() - date.getTime();
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays < 1) {
    if (diffInHours > 0) {
      return `${diffInHours} час${diffInHours === 1 ? '' : 'а'} назад`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} минут${diffInMinutes === 1 ? 'у' : 'ы'} назад`;
    } else {
      return 'только что';
    }
  } else {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`;
  }
};
