import { dialog } from 'electron';
import { promises as fs } from 'node:fs';
import { parseFile } from 'music-metadata';

export const openFile = async (): Promise<
  { mimeType: string; buffer: Buffer<ArrayBufferLike> } | undefined
> => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'Audio Files', extensions: ['mp3', 'flac', 'wav'] }],
  });

  const isCanceledOrEmpty = result.canceled || result.filePaths.length === 0;
  if (isCanceledOrEmpty) {
    return undefined;
  }

  const filePath = result.filePaths[0];
  const metadata = await parseFile(filePath);
  console.info(filePath);
  console.info(metadata);
  console.info(filePath);

  const buffer = await fs.readFile(filePath);

  return {
    mimeType: getMimeTypeByCodec(metadata.format.codec),
    buffer,
  };
};

function getMimeTypeByCodec(codec: string | undefined): string {
  const map: Record<string, string> = {
    'MPEG 1 Layer 3': 'audio/mpeg',
    FLAC: 'audio/flac',
    PCM: 'audio/wav',
  };

  return codec ? map[codec] : '';
}

// /home/den/Music/Bands/W.A.S.P/Studio albums/1984 - WASP/01 I Wanna Be Somebody.mp3
