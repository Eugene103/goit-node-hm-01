import fs from "fs/promises"
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

export const listContacts = async () => {
    const data = await fs.readFile(contactsPath)
    return JSON.parse(data)
    
} 

export const getContactById = async (id) => {
    const contacts = await listContacts()
    const result = contacts.find(contact => contact.id === id)
    return result || null;
}
export const addContact = async (name, email, phone) => {
    const contacts = await listContacts()
    const newContacts = {
        id: nanoid(),
        name: name,
        email: email,
        phone: phone,
    }
    contacts.push(newContacts)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return newContacts
}
export const removeContact = async (id) => {
    const contacts = await listContacts()
    const index = contacts.findIndex(contact => contact.id === id)
    console.log(index)
    if (index === -1) {
        return null
    }
    const result = contacts.splice(index, 1)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return result
}
