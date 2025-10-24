import type { IAudioTrackDTO, Nullable } from '@shared/types';
import { type IAudioTrack, createAudioTrack } from '../../domain/entities/i-audio-track';

export const mapDtoToAudioTrack = (dto: IAudioTrackDTO): IAudioTrack =>
  createAudioTrack({
    id: dto.id,
    path: dto.path,
    no: withDefault(dto.no, 0),
    artist: withDefault(dto.artist, ''),
    title: withDefault(dto.title, ''),
    album: withDefault(dto.album, ''),
    year: withDefault(dto.year, 0),
    duration: withDefault(dto.duration, 0),
  });

function withDefault<T>(value: Nullable<T> | undefined, def: T): T {
  return value ?? def;
}
