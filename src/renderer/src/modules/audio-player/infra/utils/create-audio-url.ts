export const createAudioUrl = (audioBuffer: Buffer<ArrayBufferLike>, mimeType: string): string =>
  URL.createObjectURL(new Blob([new Uint8Array(audioBuffer)], { type: `audio/${mimeType}` }));
