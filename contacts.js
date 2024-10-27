const fs = require('fs').promises; // Using promise version for better async handling
const path = require('path');
const contactsPath = path.join(__dirname, 'db', 'contacts.json');
// Function to read contacts from the JSON file
const readContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data); // Parse and return JSON data
  } catch (error) {
    console.error('Error reading contacts:', error);
    throw error; // Rethrow error for handling elsewhere
  }
};

// Function to write contacts to the JSON file
const writeContacts = async (contacts) => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2)); // Pretty print JSON
  } catch (error) {
    console.error('Error writing contacts:', error);
    throw error; // Rethrow error for handling elsewhere
  }
};

// Function to add a new contact
const addContact = async (newContact) => {
  const contacts = await readContacts();
  contacts.push(newContact); // Add new contact
  await writeContacts(contacts); // Save updated contacts
};

// Function to find a contact by ID
const findContactById = async (id) => {
  const contacts = await readContacts();
  return contacts.find((contact) => contact.id === id); // Return matching contact
};

// Export the functions
module.exports = {
  readContacts,
  writeContacts,
  addContact,
  findContactById,
};
