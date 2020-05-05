import ABCJS from "abcjs";

export default async (abcNotation, midiPlayer) => {
  const midi = await ABCJS.synth.getMidiFile(abcNotation, {
    midiOutputType: "binary",
  });
  await midiPlayer.stop();
  midiPlayer.play({ arrayBuffer: midi[0] });
};
