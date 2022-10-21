import { HandlerContext } from '$fresh/server.ts';
import { join } from 'https://deno.land/std@0.147.0/path/mod.ts';
import {
  ImageMagick,
  MagickGeometry,
  initializeImageMagick,
  MagickFormat,
} from 'https://deno.land/x/imagemagick_deno@0.0.14/mod.ts';

export const handler = async (
  req: Request,
  ctx: HandlerContext
): Promise<Response> => {
  const webp = req.headers.get('accept')?.includes('image/webp') ?? false;
  const params = new URLSearchParams(req.url.split('?')[1]);
  const width = Number(params.get('width')) ?? 360;
  const imageFile = await Deno.readFile(
    join('.', 'static', 'images', ctx.params.img)
  );
  const image = await transformImage(imageFile, width, webp);
  return new Response(image);
};

const transformImage = (
  image: Uint8Array,
  width: number,
  webp: boolean
): Promise<Uint8Array> =>
  new Promise((res, rej) =>
    (async () => {
      try {
        await initializeImageMagick();
        ImageMagick.read(image, (img) => {
          img.resize(new MagickGeometry(width));
          img.write(res, MagickFormat[webp ? 'Webp' : 'Jpg']);
        });
      } catch (e) {
        console.error(e);
        rej(e);
      }
    })()
  );
