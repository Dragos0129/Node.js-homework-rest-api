const { Command } = require('commander');
const program = new Command();
const {
  readContacts,
  findContactById,
  addContact,
  writeContacts,
} = require('./contacts');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case 'list':
        const contacts = await readContacts();
        console.table(contacts);
        break;

      case 'get':
        const contact = await findContactById(id);
        console.log(contact);
        break;

      case 'add':
        const newContact = {
          id: Date.now().toString(), // ensure a unique ID
          name,
          email,
          phone,
        };
        await addContact(newContact);
        console.log('Added contact:', newContact);
        break;

      case 'remove':
        const contactsToRemove = await readContacts();
        const updatedContacts = contactsToRemove.filter(
          (contact) => contact.id !== id
        );
        await writeContacts(updatedContacts);
        console.log(`Removed contact with id: ${id}`);
        break;

      default:
        console.warn('\x1B[31m Unknown action type!');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

invokeAction(argv);
