import assert from "node:assert";
import path from "node:path";

function fullJustify(words: string[], maxWidth: number): string[] {
  const result: string[] = [];
  let line: string[] = [];
  let wordsTotalLengthInLine = 0; // without space in between

  for (let i = 0; i <= words.length; i++) {
    const word = words[i];
    const occupiedSpaceInLine = line.length + wordsTotalLengthInLine;

    if (word && occupiedSpaceInLine + word.length <= maxWidth) {
      line.push(word);
      wordsTotalLengthInLine += word.length;
    } else if (line.length) {
      let lineText = line[0]!;
      wordsTotalLengthInLine -= lineText?.length ?? 0;

      const isLastLine = i == words.length; // if this line iteration the end, then this line is the end line

      if (!isLastLine && line.length > 1) {
        for (let j = 1; j < line.length; j++) {
          const word = line[j]!;
          wordsTotalLengthInLine -= word.length;

          const totalRemainingCellsToFill = maxWidth - (lineText?.length ?? 0);
          const cellsAvailableToPad =
            totalRemainingCellsToFill -
            (line.length - j - 1 + wordsTotalLengthInLine + word.length + 1);

          const extraPaddingNumber = Math.ceil(
            cellsAvailableToPad / (line.length - j),
          );

          lineText = lineText + " " + " ".repeat(extraPaddingNumber) + word;
        }
      } else {
        lineText = line.reduce(
          (lineText, word, index) => lineText + (index == 0 ? "" : " ") + word,
          "",
        );

        lineText = lineText + " ".repeat(maxWidth - lineText.length);
      }

      result.push(lineText);

      if (word) {
        line = [];
        line.push(word);
        wordsTotalLengthInLine = word.length;
      }
    }
  }

  return result;
}

const inputA_Words = [
  "This",
  "is",
  "an",
  "example",
  "of",
  "text",
  "justification.",
];
const inputA_MaxWidth = 16;

assert.equal(
  fullJustify(inputA_Words, inputA_MaxWidth).join(","),
  ["This    is    an", "example  of text", "justification.  "].join(","),
  `❗️ ${path.basename(__filename)} - Input A expected to pass!`,
);

const inputC_Words = ["What", "must", "be", "acknowledgment", "shall", "be"];
const inputC_MaxWidth = 16;

assert.equal(
  fullJustify(inputC_Words, inputC_MaxWidth).join(","),
  ["What   must   be", "acknowledgment  ", "shall be        "].join(","),
  `❗️ ${path.basename(__filename)} - Input C expected to pass!`,
);

const inputD_Words = [
  "Science",
  "is",
  "what",
  "we",
  "understand",
  "well",
  "enough",
  "to",
  "explain",
  "to",
  "a",
  "computer.",
  "Art",
  "is",
  "everything",
  "else",
  "we",
  "do",
];
const inputD_MaxWidth = 20;
assert.equal(
  fullJustify(inputD_Words, inputD_MaxWidth).join(","),
  [
    "Science  is  what we",
    "understand      well",
    "enough to explain to",
    "a  computer.  Art is",
    "everything  else  we",
    "do                  ",
  ].join(","),
  `❗️ ${path.basename(__filename)} - Input D expected to pass!`,
);
console.log(`✅ ${path.basename(__filename)}`);
