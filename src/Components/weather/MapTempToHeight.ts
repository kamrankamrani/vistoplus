import { Test_list } from "./Chart";

export default function MapTempToHeight(
  tempData: Test_list[],
  maxHeight: number
) {
  const len_ = tempData.length;
  let maxSum = 0;
  let minSum = 0;
  let maxAvr = 0;
  let minAvr = 0;
  let maxScale = 0;
  const maxPixels: number[] = [] as number[];
  const minPixels: number[] = [] as number[];
  let minScale = 0;
  tempData.forEach((element) => {
    maxSum += parseInt(element.main.temp_max);
    minSum += parseInt(element.main.temp_min);
  });
  maxAvr = Math.floor(maxSum / len_);
  minAvr = Math.floor(minSum / len_);
  maxScale = parseFloat((maxHeight / 2 / maxAvr).toFixed(2));
  minScale = parseFloat((maxHeight / 2 / minAvr).toFixed(2));
  if (maxScale > maxHeight || maxScale <= 0) maxScale = maxHeight / 2;
  if (minScale > maxHeight || minScale <= 0) minScale = maxHeight / 2;
  for (let index = 0; index < len_; index++) {
    let max_ = parseInt(
      (
        maxHeight / 2 -
        parseInt(tempData[index].main.temp_max) * maxScale
      ).toFixed(2)
    );
    let min_ = parseInt(
      (
        maxHeight / 2 -
        parseInt(tempData[index].main.temp_min) * minScale
      ).toFixed(2)
    );
    if (max_ + maxHeight / 2 <= 8) max_ = 10 - maxHeight / 2; // 8 is r+3 of circle and 10 is just a padding
    if (min_ + maxHeight / 2 <= 8) min_ = 10 - maxHeight / 2; // 8 is r+3 of circle and 10 is just a padding
    if (max_ >= maxHeight / 2 - 8) max_ = maxHeight / 2 - 10; // 5 is r of circle and 10 is just a padding
    if (min_ >= maxHeight / 2 - 8) min_ = maxHeight / 2 - 10; // 5 is r of circle and 10 is just a padding
    maxPixels[index] = max_;
    minPixels[index] = min_;
  }
  // minScale = (minHeight)
  //   console.log("maxScale ", maxScale);
  console.log("maxPixels ", maxPixels);
  console.log("minPixels ", minPixels);
  return [maxPixels, minPixels];
}
