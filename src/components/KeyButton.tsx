import { useContext } from 'react';
import VolumeContext from '../context/VolumeContext.tsx';
import ChordConstructor from '../library/ChordConstructor.ts';

export default function KeyButton({ chord, label }: { chord: ChordConstructor, label: string }) {
  const volume = useContext(VolumeContext);
  return (
    <button
      onMouseDown={() => { chord.attack(volume); }}
      onMouseUp={() => { chord.release(); }}
      style={{ margin: 4, }}
    >{label}</button>
  );
}
