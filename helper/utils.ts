export const money = (currency: string) => new Intl.NumberFormat('en-US', { style: 'currency', currency });
export const numberFormat = new Intl.NumberFormat();

export const toLatinConvert = (input: string) => {
  if (!input) return '';

  let str: string = input;

  str = str.replaceAll('яа', 'ya');
  str = str.replaceAll('ЯА', 'YA');

  str = str.replaceAll('ЮУ', 'YU');
  str = str.replaceAll('ЁО', 'YO');

  str = str.replaceAll('б', 'b');
  str = str.replaceAll('Б', 'B');

  str = str.replaceAll('в', 'v');
  str = str.replaceAll('В', 'V');

  str = str.replaceAll('г', 'g');
  str = str.replaceAll('Г', 'G');

  str = str.replaceAll('д', 'd');
  str = str.replaceAll('Д', 'D');

  str = str.replaceAll('е', 'ye');
  str = str.replaceAll('Е', 'Ye');

  str = str.replaceAll('ж', 'j');
  str = str.replaceAll('Ж', 'j');

  str = str.replaceAll('з', 'z');
  str = str.replaceAll('З', 'Z');

  str = str.replaceAll('и', 'i');
  str = str.replaceAll('И', 'I');

  str = str.replaceAll('ү', 'u');
  str = str.replaceAll('Ү', 'U');

  str = str.replaceAll('й', 'i');
  str = str.replaceAll('Й', 'I');

  str = str.replaceAll('к', 'k');
  str = str.replaceAll('К', 'K');

  str = str.replaceAll('л', 'l');
  str = str.replaceAll('Л', 'L');

  str = str.replaceAll('м', 'm');
  str = str.replaceAll('М', 'M');

  str = str.replaceAll('н', 'n');
  str = str.replaceAll('Н', 'N');

  str = str.replaceAll('п', 'p');
  str = str.replaceAll('П', 'P');

  str = str.replaceAll('р', 'r');
  str = str.replaceAll('Р', 'R');

  str = str.replaceAll('с', 's');
  str = str.replaceAll('С', 'S');

  str = str.replaceAll('ч', 'ch');
  str = str.replaceAll('Ч', 'Ch');

  str = str.replaceAll('ш', 'sh');
  str = str.replaceAll('Ш', 'Sh');

  str = str.replaceAll('ю', 'yu');
  str = str.replaceAll('Ю', 'Yu');

  str = str.replaceAll('э', 'e');
  str = str.replaceAll('Э', 'E');

  str = str.replaceAll('Я', 'Ya');
  str = str.replaceAll('я', 'ya');

  str = str.replaceAll('ь', 'i');
  str = str.replaceAll('Ь', 'I');

  str = str.replaceAll('т', 't');
  str = str.replaceAll('Т', 'T');

  str = str.replaceAll('ц', 'ts');
  str = str.replaceAll('Ц', 'Ts');

  str = str.replaceAll('о', 'o');
  str = str.replaceAll('О', 'O');

  str = str.replaceAll('ө', 'u');
  str = str.replaceAll('Ө', 'U');

  str = str.replaceAll('е', 'e');
  str = str.replaceAll('Е', 'E');

  str = str.replaceAll('а', 'a');
  str = str.replaceAll('А', 'A');

  str = str.replaceAll('ф', 'f');
  str = str.replaceAll('Ф', 'F');

  str = str.replaceAll('і', 'i');
  str = str.replaceAll('І', 'I');

  str = str.replaceAll('У', 'U');
  str = str.replaceAll('у', 'u');

  str = str.replaceAll('х', 'kh');
  str = str.replaceAll('Х', 'Kh');

  str = str.replaceAll('Ё', 'Yo');
  str = str.replaceAll('ё', 'yo');

  str = str.replaceAll('ы', 'y');
  str = str.replaceAll('Ы', 'Y');

  str = str.replaceAll('ъ', 'i');
  str = str.replaceAll('Ъ', 'I');

  str = str.replaceAll('Є', 'U');
  str = str.replaceAll('Ї', 'U');

  str = str.replaceAll('щ', 'sh');
  str = str.replaceAll('Щ', 'Sh');
  return str;
};

export const isLatinCharacter = (c: string) => {
  if (!c) return false;
  const n = c.toUpperCase().charCodeAt(0);
  if (65 <= n && n <= 90) return true;
  return false;
};

export const isNumberCharacter = (c: string) => {
  if (!c) return false;
  const n: number = c.charCodeAt(0);
  if (48 <= n && n <= 57) return true;
  return false;
};

export const isMongolianCharacter = (c: string) => {
  if (!c) return false;
  const n: number = c.charCodeAt(0);
  if (n <= 125) return true;
  return false;
};

export const charSortValue = (c: string) => {
  if (isMongolianCharacter(c)) return 0 + c.charCodeAt(0);
  if (isLatinCharacter(c)) return 1000 + c.charCodeAt(0);
  if (isNumberCharacter(c)) return 2000 + c.charCodeAt(0);
  return 4000 + c.charCodeAt(0);
};
export function handleInputClick(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
  const inputElement = event.target as HTMLInputElement;
  inputElement.select();
}
export function getCookie(name: string): string | null {
  const cookieName = `${name}=`;
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return null;
}
export function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
export function deleteAllCookies() {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookieName = cookies[i].split('=')[0].trim();
    deleteCookie(cookieName);
  }
}
