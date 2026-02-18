export class AppDate {
  //deadline(string型) -> Int型(10進数) -> Dateオブジェクトに変換
  static parse(dateString) {
    if (!dateString) {
      return;
    }

    // sample...const [y, m, d] = [2026, 2, 5];
    // const y = 2026;
    // const m = 2;
    // const d = 5;
    const [year, month, day] = dateString
      .split("-")
      .map((str) => parseInt(str, 10));
    return new AppDate(new Date(year, month - 1, day));
  }

  constructor(date = new Date()) {
    this.date = date;
  }

  get cloneDate() {
    return new Date(this.date.getTime());
  }

  toString() {
    const month = (this.date.getMonth() + 1).toString().padStart(2, "0");
    const day = this.date.getDate().toString().padStart(2, "0");

    return `${this.date.getFullYear()}-${month}-${day}`;
  }

  getDateInXMonth(n) {
    const date = (this.date.getMonth() + n) % 12;
    const res = new Date(this.cloneDate.setMonth(date));

    return new AppDate(res);
  }

  getTime() {
    return this.date.getTime();
  }

  isAfter(date) {
    return this.date.getTime() > date.getTime();
  }
}

// components

// class名 = klass のdivを生成
function div(klass) {
  const div = document.createElement("div");
  div.setAttribute("class", klass);

  return div;
}

// iを生成
function icon(klass, onClick) {
  const i = document.createElement("i");
  i.setAttribute("class", klass);
  i.addEventListener("click", onClick);

  return i;
}

// ボタンを生成
function button(text, klass, onClick) {
  const button = document.createElement("button");
  button.setAttribute("class", `button ${klass}`);
  button.textContent = text;
  button.addEventListener("click", onClick);

  return button;
}

// チェックボックスを生成
function checkbox(checked, onClick) {
  // debugger;

  const label = document.createElement("label");
  label.setAttribute("class", "checkbox");
  if (checked) {
    label.classList.add("checkbox--checked");
  }

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("class", "checkbox__input");
  checkbox.checked = checked;

  label.addEventListener("click", () => {
    checkbox.checked = !checkbox.checked;
    if (checkbox.checked) {
      label.classList.add("checkbox--checked");
    } else {
      label.classList.remove("checkbox--checked");
    }

    onClick(checkbox.checked);
  });
  label.appendChild(checkbox);
  label.appendChild(icon("icon icon--check fa-solid fa-check", onClick));

  return label;
}
