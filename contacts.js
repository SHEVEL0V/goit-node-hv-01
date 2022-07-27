/** @format */

const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./bd/contacts.json");

function listContacts() {
  return fs
    .readFile(contactsPath, "utf8")
    .then((data) => console.log(JSON.parse(data)))
    .catch((err) => console.log(err.message));
}

function getContactById(contactId) {
  return fs
    .readFile(contactsPath, "utf8")
    .then((data) => {
      const contacsArey = JSON.parse(data);
      return console.log(
        contacsArey.filter((el) => el.id === contactId.toString())
      );
    })
    .catch((err) => console.log(err.message));
}

async function removeContact(contactId = null) {
  try {
    const contacsArey = await fs
      .readFile(contactsPath, "utf8")
      .then((data) => JSON.parse(data));

    const newContacs = JSON.stringify(
      contacsArey.filter((el) => el.id !== contactId.toString())
    );

    await fs.writeFile(contactsPath, newContacs);

    await fs
      .readFile(contactsPath, "utf8")
      .then((data) => console.log(JSON.parse(data)));
  } catch (err) {
    console.log(err.message);
  }
}

async function addContact(name = "", email = "", phone = "") {
  try {
    const contacsArey = await fs
      .readFile(contactsPath, "utf8")
      .then((data) => JSON.parse(data));

    const id = (contacsArey.length + 1).toString();

    const newContacs = JSON.stringify([
      ...contacsArey,
      { id, name, email, phone },
    ]);

    await fs.writeFile(contactsPath, newContacs);

    await fs
      .readFile(contactsPath, "utf8")
      .then((data) => console.log(JSON.parse(data)));
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
