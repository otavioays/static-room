(() => {
  const image = document.querySelector('.art-header__line-image');
  const frame = document.querySelector('.art-header');

  if (!image || !frame) return;

  let bounds = null;

  const findBounds = () => {
    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) return null;

    context.drawImage(image, 0, 0);
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;

    const scan = (inkOnly) => {
      let left = canvas.width;
      let right = -1;
      let top = canvas.height;
      let bottom = -1;

      for (let y = 0; y < canvas.height; y += 1) {
        for (let x = 0; x < canvas.width; x += 1) {
          const index = (y * canvas.width + x) * 4;
          const red = pixels[index];
          const green = pixels[index + 1];
          const blue = pixels[index + 2];
          const alpha = pixels[index + 3];

          if (alpha < 12) continue;

          if (inkOnly) {
            const luminance = (red * 0.2126) + (green * 0.7152) + (blue * 0.0722);
            if (luminance > 238) continue;
          }

          if (x < left) left = x;
          if (x > right) right = x;
          if (y < top) top = y;
          if (y > bottom) bottom = y;
        }
      }

      if (right < left || bottom < top) return null;

      return {
        left,
        top,
        width: right - left + 1,
        height: bottom - top + 1,
      };
    };

    let result = scan(false);

    if (
      result &&
      result.width > canvas.width * 0.92 &&
      result.height > canvas.height * 0.92
    ) {
      result = scan(true) || result;
    }

    return result;
  };

  const positionDivider = () => {
    if (!bounds || !image.naturalWidth || !image.naturalHeight) return;

    const frameWidth = frame.clientWidth;
    const frameHeight = frame.clientHeight;
    const scale = frameWidth / bounds.width;

    image.style.width = `${image.naturalWidth * scale}px`;
    image.style.height = `${image.naturalHeight * scale}px`;
    image.style.left = `${-bounds.left * scale}px`;
    image.style.top = `${((frameHeight - (bounds.height * scale)) / 2) - (bounds.top * scale)}px`;
    image.classList.add('is-ready');
  };

  const prepareDivider = () => {
    try {
      bounds = findBounds();
    } catch (error) {
      bounds = null;
    }

    if (!bounds) {
      image.style.width = '160vw';
      image.style.height = 'auto';
      image.style.left = '50%';
      image.style.top = '50%';
      image.style.transform = 'translate(-50%, -50%)';
      image.classList.add('is-ready');
      return;
    }

    positionDivider();
  };

  if (image.complete && image.naturalWidth) {
    prepareDivider();
  } else {
    image.addEventListener('load', prepareDivider, { once: true });
  }

  window.addEventListener('resize', () => {
    if (bounds) window.requestAnimationFrame(positionDivider);
  });
})();
