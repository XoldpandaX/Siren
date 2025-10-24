import { dialog } from 'electron';
import { promises as fs } from 'node:fs';
import { parseFile } from 'music-metadata';
import type { IAudioTrackDTO } from '@shared/types';

export const openFile = async (): Promise<IAudioTrackDTO | undefined> => {
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
  const audioBuffer = await fs.readFile(filePath);
  console.info(filePath);
  console.info(metadata);
  console.info(filePath);

  return {
    id: 'some id',
    path: filePath,
    mimeType: getMimeTypeByCodec(metadata.format.codec),
    audioBuffer,
    no: metadata.common.track.no,
    artist: metadata.common.artist,
    title: metadata.common.title,
    album: metadata.common.album,
    year: metadata.common.year,
    duration: metadata.format.duration,
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
