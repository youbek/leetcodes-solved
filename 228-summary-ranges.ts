import assert from "node:assert";
import path from "node:path";

function summaryRanges(nums: number[]): string[] {
  if (nums.length <= 1) {
    return nums.map((num) => String(num));
  }

  const result: string[] = [];
  for (let i = 1, a = 0, b = 0; i < nums.length; i++) {
    const startValue = nums[a]!;
    const endValue = nums[b]!;
    const currentValue = nums[i]!;

    if (currentValue - endValue > 1) {
      result.push(a == b ? `${startValue}` : `${startValue}->${endValue}`);
      a = i;
      b = i;
    } else {
      b++;
    }

    if (i == nums.length - 1) {
      const startValue = nums[a]!;
      const endValue = nums[b]!;
      result.push(a == b ? `${startValue}` : `${startValue}->${endValue}`);
    }
  }

  return result;
}

const inputA = [0, 1, 2, 4, 5, 7];
assert.equal(
  summaryRanges(inputA).join(","),
  ["0->2", "4->5", "7"].join(","),
  "❗️ Input A failed",
);

const inputB = [0, 2, 3, 4, 6, 8, 9];
assert.equal(
  summaryRanges(inputB).join(","),
  ["0", "2->4", "6", "8->9"],
  "❗️ Input B failed",
);

console.log(`✅ ${path.basename(__filename)}`);
