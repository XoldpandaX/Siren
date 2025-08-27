import { type FC, useState, useEffect } from 'react';
import { AudioSource, IAudioSource } from '@renderer/modules/audio-player/services';

type AudioPlayerProps = {
  audioPath: string;
};

export const AudioPlayer: FC<AudioPlayerProps> = ({ audioPath }) => {
  const [audioSource, setAudioSource] = useState<IAudioSource | null>(null);

  useEffect(() => {
    if (!audioSource) {
      setAudioSource(
        new AudioSource(audioPath, {
          onEnd: () => console.info('track ends'),
          onTimeUpdate: (seconds: number) => console.info(seconds),
        })
      );
    }
  }, [audioSource, audioPath]);

  useEffect(() => {
    if (!audioSource) {
      return;
    }

    audioSource.play();
  }, [audioSource]);

  const play = (): void => {
    audioSource?.play.call(audioSource);
  };

  const pause = (): void => {
    audioSource?.pause.call(audioSource);
  };

  const stop = (): void => {
    audioSource?.stop.call(audioSource);
  };

  return (
    <div className="audio-player">
      <div>
        <button onClick={play}>play</button>
        <button onClick={pause}>pause</button>
        <button onClick={stop}>stop</button>
      </div>
    </div>
  );
};
