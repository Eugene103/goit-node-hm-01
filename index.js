import * as contactServies from "./contact.js"
import { program } from "commander";

 const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
          const allContacts = await contactServies.listContacts();
          return console.log(allContacts)
    case 'get':
      const getContacts = await contactServies.getContactById(id)
      return console.log(getContacts)

    case 'add':
      const newContact = await contactServies.addContact(name, email, phone)
      return console.log(newContact)

    case 'remove':
          const delContact = await contactServies.removeContact(id)
          return console.log(delContact)

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const options = program.opts();
invokeAction(options);