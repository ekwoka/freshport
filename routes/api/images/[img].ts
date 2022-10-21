import { HandlerContext } from '$fresh/server.ts';
import { join } from 'https://deno.land/std@0.147.0/path/mod.ts';
import {
  ImageMagick,
  MagickGeometry,
  initializeImageMagick,
  MagickFormat,
} from 'https://deno.land/x/imagemagick_deno@0.0.14/mod.ts';
import { exists } from '../../../utils/index.ts';

export const handler = async (
  req: Request,
  ctx: HandlerContext
): Promise<Response> => {
  const webp = req.headers.get('accept')?.includes('image/webp') ?? false;
  const params = new URLSearchParams(req.url.split('?')[1]);
  const width = Number(params.get('width')) ?? 360;
  const originalPath = join('.', 'static', 'images', ctx.params.img);
  const transformedPath = join(
    '.',
    'static',
    'images',
    'transformed',
    ctx.params.img.replace(
      /\.[a-z]{3,4}/,
      `-${width}w.${webp ? 'webp' : 'jpg'}`
    )
  );
  if (await exists(transformedPath))
    return new Response(await Deno.readFile(transformedPath));
  const imageFile = await Deno.readFile(originalPath);
  const image = await transformImage(imageFile, width, webp);
  await Deno.writeFile(transformedPath, image);
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
