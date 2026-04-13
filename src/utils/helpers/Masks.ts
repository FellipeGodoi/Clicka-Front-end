export type MaskType = "date" |"cpf" | "cnpj" | "phone" | "zipcode" | "number" | "sus" | "no-space" | "only-letters" | "capitalize-name" | "none";

export const applyMask = (value: string, mask?: MaskType): string => {
  const digits = value.replace(/\D/g, "");

  if (!mask || mask === "none") return value;

  switch (mask) {
    case "cpf":
      return digits
        .replace(/^(\d{3})(\d)/, "$1.$2")
        .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4")
        .slice(0, 14);

    case "cnpj":
      return digits
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4")
        .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, "$1.$2.$3/$4-$5")
        .slice(0, 18);

    case "phone":
      if (digits.length <= 10) {
        // (XX) XXXX-XXXX
        return digits
          .replace(/^(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{4})(\d)/, "$1-$2")
          .slice(0, 14);
      } else {
        // (XX) XXXXX-XXXX
        return digits
          .replace(/^(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{5})(\d)/, "$1-$2")
          .slice(0, 15);
      }

    case "zipcode":
      return digits
        .replace(/^(\d{5})(\d)/, "$1-$2")
        .slice(0, 9);

    case "number":
      return digits.slice(0, 20);

    case "sus":
      return digits
        .replace(/^(\d{3})(\d)/, "$1 $2")
        .replace(/^(\d{3}) (\d{4})(\d)/, "$1 $2 $3")
        .replace(/^(\d{3}) (\d{4}) (\d{4})(\d)/, "$1 $2 $3 $4")
        .slice(0, 18);

    case "no-space":
      return value.replace(/\s+/g, "");

    case "only-letters":
      return value.replace(/[^a-zA-Z]/g, "");

    case "capitalize-name":
      return value
        .replace(/[^a-zA-ZÀ-ÿ\s]/g, "")
        .toLowerCase()
        .replace(/\b\w/g, char => char.toUpperCase());

case "date": {
  const digits = value.replace(/\D/g, "").slice(0, 8);

  let day = "";
  let month = "";
  let year = "";

  if (digits.length >= 2) {
    day = digits.slice(0, 2);
    let d = Number(day);

    if (d === 0) d = 1;
    if (d > 31) d = 31;

    day = d.toString().padStart(2, "0");
  } else {
    day = digits;
  }

  if (digits.length >= 4) {
    month = digits.slice(2, 4);
    let m = Number(month);

    if (m === 0) m = 1;
    if (m > 12) m = 12;

    month = m.toString().padStart(2, "0");
  } else if (digits.length > 2) {
    month = digits.slice(2);
  }

  if (digits.length > 4) {
    year = digits.slice(4, 8);
    let y = Number(year);

    if (y > 2999) y = 2999;
    if (y < 1900 && year.length === 4) y = 1900;

    year = y.toString();
  }

  let result = day;

  if (month) result += `/${month}`;
  if (year) result += `/${year}`;

  return result;
}


    default:
      return value;
  }
};
