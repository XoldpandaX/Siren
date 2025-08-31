export interface IMediaLibraryRepository {
  getAudioTrack(): Promise<{ path: string }>;
}
