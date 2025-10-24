export const diTokens = {
  AUDIO_ENGINE: Symbol(`IAudioPlayerExternalPorts['audioEngine']`),
  MEDIA_LIBRARY_REPOSITORY: Symbol('IMediaLibraryRepository'),
  LOAD_TRACK_USE_CASE: Symbol('ILoadTrackUseCase'),
  PLAY_TRACK_USE_CASE: Symbol('IPlayTrackUseCase'),
  PAUSE_TRACK_USE_CASE: Symbol('IPauseTrackUseCase'),
  STOP_TRACK_USE_CASE: Symbol('IStopTrackUseCase'),
  SEEK_TRACK_USE_CASE: Symbol('ISeekTrackUseCase'),
  UPDATE_TRACK_PLAYBACK_POSITION_USE_CASE: Symbol('IUpdateTrackPlaybackPosition'),
  AUDIO_PLAYER_STORE_ADAPTER: Symbol('IAudioPlayerStoreAdapter'),
  AUDIO_PLAYER_CONTROLLER: Symbol('IAudioPlayerActionsController'),
};
