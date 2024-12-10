import { toSvg } from 'html-to-image';

/**
 * HTML 요소를 SVG로 변환하여 다운로드하는 커스텀 훅
 */
export const useDownloadImage = () => {
  const downloadAsSvg = async () => {
    const element = document.querySelector('.elements-container');
    if (!element) return;

    try {
      const dataUrl = await toSvg(element as HTMLElement, {
        backgroundColor: '#ffffff',
        width: element.scrollWidth,
        height: element.scrollHeight,
        style: {
          transform: 'none',
          margin: '0',
        },
        skipAutoScale: true,
        pixelRatio: 1,
      });

      const link = document.createElement('a');
      link.download = 'elements.svg';
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('SVG 다운로드 중 오류가 발생했습니다:', error);
    }
  };

  return { downloadAsSvg };
};
