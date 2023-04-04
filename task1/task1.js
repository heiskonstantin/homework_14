// Вам дана заготовка и результат, который вы должны получить.
// Ваша задача — написать код, который будет преобразовывать XML в JS-объект и выводить его в консоль.

const xml = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

const parser = new DOMParser();
const xmlDOM = parser.parseFromString(xml, "text/xml");
const students = xmlDOM.getElementsByTagName("student");

const result = { list: [] };

for (let i = 0; i < students.length; i++) {
  const nameEl = students[i].getElementsByTagName("name")[0];
  const firstNameEl = nameEl.getElementsByTagName("first")[0];
  const lastNameEl = nameEl.getElementsByTagName("second")[0];
  const langAttr = nameEl.getAttribute("lang");
  const ageEl = students[i].getElementsByTagName("age")[0];
  const profEl = students[i].getElementsByTagName("prof")[0];

  const studentObj = {
    name: `${firstNameEl.textContent} ${lastNameEl.textContent}`,
    age: Number(ageEl.textContent),
    prof: profEl.textContent,
    lang: langAttr,
  };

  result.list.push(studentObj);
}

console.log(result);
