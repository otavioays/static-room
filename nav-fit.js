(() => {
  const entries = Array.from(document.querySelectorAll('.nav-label-frame'));

  const scanBounds = (image) => {
    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) return null;

    context.drawImage(image, 0, 0);
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;

    const samples = [];
    const stepX = Math.max(1, Math.floor(canvas.width / 30));
    const stepY = Math.max(1, Math.floor(canvas.height / 30));

    for (let x = 0; x < canvas.width; x += stepX) {
      samples.push([x, 0], [x, canvas.height - 1]);
    }

    for (let y = 0; y < canvas.height; y += stepY) {
      samples.push([0, y], [canvas.width - 1, y]);
    }

    let bgRed = 0;
    let bgGreen = 0;
    let bgBlue = 0;
    let bgCount = 0;

    samples.forEach(([x, y]) => {
      const index = (y * canvas.width + x) * 4;
      if (pixels[index + 3] < 12) return;
      bgRed += pixels[index];
      bgGreen += pixels[index + 1];
      bgBlue += pixels[index + 2];
      bgCount += 1;
    });

    if (bgCount) {
      bgRed /= bgCount;
      bgGreen /= bgCount;
      bgBlue /= bgCount;
    }

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

        const luminance = (red * 0.2126) + (green * 0.7152) + (blue * 0.0722);
        const backgroundLuminance = (bgRed * 0.2126) + (bgGreen * 0.7152) + (bgBlue * 0.0722);
        const distance = Math.hypot(red - bgRed, green - bgGreen, blue - bgBlue);
        const visible = luminance < Math.min(215, backgroundLuminance - 18) || distance > 36;

        if (!visible) continue;

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

  const prepare = (frame) => {
    const image = frame.querySelector('.nav-label-art');
    if (!image) return;

    let bounds = null;

    const position = () => {
      if (!bounds || !image.naturalWidth || !image.naturalHeight) return;

      const scale = Math.min(frame.clientWidth / bounds.width, frame.clientHeight / bounds.height);
      const visibleWidth = bounds.width * scale;
      const visibleHeight = bounds.height * scale;

      image.style.width = `${image.naturalWidth * scale}px`;
      image.style.height = `${image.naturalHeight * scale}px`;
      image.style.left = `${((frame.clientWidth - visibleWidth) / 2) - (bounds.left * scale)}px`;
      image.style.top = `${((frame.clientHeight - visibleHeight) / 2) - (bounds.top * scale)}px`;
      image.classList.add('is-ready');
    };

    const load = () => {
      try {
        bounds = scanBounds(image);
      } catch (error) {
        bounds = null;
      }

      if (!bounds) {
        image.style.width = '100%';
        image.style.height = '100%';
        image.style.left = '0';
        image.style.top = '0';
        image.style.objectFit = 'contain';
        image.classList.add('is-ready');
        return;
      }

      position();
      window.addEventListener('resize', () => window.requestAnimationFrame(position));
    };

    if (image.complete && image.naturalWidth) load();
    else image.addEventListener('load', load, { once: true });
  };

  entries.forEach(prepare);
})();
