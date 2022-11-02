export const getScrollbarWidth = () => {
  let width = 0;
  if (typeof window !== 'undefined') {
    if ((window as any).scrollbarWidth) {
      return (window as any).scrollbarWidth;
    }
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    document.body.appendChild(outer);
    const inner = document.createElement('div');
    outer.appendChild(inner);
    width = outer.offsetWidth - inner.offsetWidth;
    outer.parentNode?.removeChild(outer);
    (window as any).scrollbarWidth = width;
  }
  return width;
};

export const formatDate = (date: Date) => {
  return date.toISOString().substring(0, 10);
};
