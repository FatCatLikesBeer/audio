export default function keyJumper(previousKey: number, semiTones: number): number {
  return (previousKey * (2 ** (semiTones / 12)));
}
