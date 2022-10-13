export const getRespSrc = (imgurl: string, size = 360): string => {
  return `${imgurl}?nf_resize=fit&w=${size}`;
};

export const getRespSrcSet = (imgurl: string): string => {
  return RESP_SIZES.map((size) => `${getRespSrc(imgurl, size)} ${size}w`).join(
    ','
  );
};

const RESP_SIZES = [180, 360, 540, 720, 960, 1080, 1200, 1440, 1680, 1920];
