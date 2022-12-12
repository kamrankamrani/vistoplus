// function PersianNum(num, dontTrim) {
//     var i = 0,

//         dontTrim = dontTrim || false,

//         num = dontTrim ? num.toString() : num.toString().trim(),
//         len = num.length,

//         res = '',
//         pos,

//         persianNumbers = typeof persianNumber == 'undefined' ?
//             ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'] :
//             persianNumbers;
//     for (; i < len; i++)
//         if ((pos = persianNumbers[num.charAt(i)])) {
//             res += pos;
//         }
//         else {
//             res += num.charAt(i);
//         }
//     return res;
// }

export function NumToPersian(inputNum: number | string | undefined): string {
  if (inputNum === undefined) return "";
  if (typeof inputNum !== "string") {
    inputNum = inputNum.toString();
  }
  const length = inputNum.length;
  const persianNums = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  let result = "";
  for (let i = 0; i < length; i++) {
    if (inputNum[i] >= "0" && inputNum[i] <= "9") {
      result += persianNums[parseInt(inputNum[i])];
    } else {
      result += inputNum[i];
    }
  }
  return result;
}
