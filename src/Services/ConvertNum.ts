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

export function NumToPersian(inputNum: number | string): string {
  if (typeof inputNum === "number") {
    inputNum = inputNum.toString();
  }
  const length = inputNum.length;
  const persianNums = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  let result = "";
  for (let i = 0; i < length; i++) {
    result += persianNums[parseInt(inputNum[i])];
  }
  return result;
}
