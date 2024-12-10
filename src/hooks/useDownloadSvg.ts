/**
 * SVG 다운로드 기능을 제공하는 커스텀 훅
 * HTML 요소들을 SVG 형식으로 변환하여 다운로드합니다.
 * @returns {Function} SVG 다운로드 함수
 */

export const useDownloadSvg = () => {
  /**
   * elements-container 클래스를 가진 컨테이너 내부의 모든 요소들을
   * SVG 형식으로 변환하여 다운로드하는 함수
   */
  const downloadAsSvg = () => {
    // 대상 컨테이너 요소 선택
    const container = document.querySelector('.elements-container');
    if (!container) return;

    // SVG 루트 요소 생성 및 크기 설정
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const containerRect = container.getBoundingClientRect();
    svg.setAttribute('width', containerRect.width.toString());
    svg.setAttribute('height', containerRect.height.toString());

    // data-element 속성을 가진 모든 요소 선택
    const elements = container.querySelectorAll('[data-element]');
    elements.forEach((el) => {
      // 각 요소의 위치 및 크기 정보 획득
      const rect = el.getBoundingClientRect();
      const clone = el.cloneNode(true) as HTMLElement;
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

      // 원본 요소의 스타일 정보 획득
      const styles = window.getComputedStyle(el);
      const backgroundColor = styles.backgroundColor;

      /**
       * foreignObject를 사용하여 HTML 요소를 SVG 내부에 포함
       * - HTML 요소의 모든 스타일과 구조를 유지할 수 있음
       * - 브라우저 호환성이 보장됨
       */
      const foreignObject = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'foreignObject'
      );
      foreignObject.setAttribute('width', rect.width.toString());
      foreignObject.setAttribute('height', rect.height.toString());

      // 클론된 요소에 스타일 적용
      clone.style.backgroundColor = backgroundColor;
      clone.style.width = '100%';
      clone.style.height = '100%';

      // 요소들을 SVG 구조에 추가
      foreignObject.appendChild(clone);
      // 컨테이너 기준 상대 위치 계산하여 transform 적용
      g.setAttribute(
        'transform',
        `translate(${rect.x - containerRect.x}, ${rect.y - containerRect.y})`
      );
      g.appendChild(foreignObject);
      svg.appendChild(g);
    });

    // SVG를 문자열로 직렬화하고 다운로드 링크 생성
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'elements.svg';

    // 다운로드 실행 및 메모리 정리
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return downloadAsSvg;
};
