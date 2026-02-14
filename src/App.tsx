import { useState } from 'react'

type Contact = {
  id: number
  name: string
  phone: string
}

type ContactCardProps = {
  contact: Contact
  onDelete: (id: number) => void
}

type ContactListProps = {
  contacts: Contact[]
  onDelete: (id: number) => void
}

function ContactCard({ contact, onDelete }: ContactCardProps) {
  return (
    <div className="flex justify-between items-center p-3 border-b">
      <div>
        <div className="font-semibold">{contact.name}</div>
        <div className="text-gray-500">{contact.phone}</div>
      </div>
      <button
        onClick={() => onDelete(contact.id)}
        className="text-red-600 hover:text-red-900" >Удалить</button>
    </div>
  )
}

function ContactList({ contacts, onDelete }: ContactListProps) {
  return (
    <div className="max-w-md mx-auto bg-gray-200 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Контакты ({contacts.length})</h2>
      {contacts.map(contact => (
        <ContactCard key={contact.id} contact={contact} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default function App() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const addContact = () => {
    if (name && phone) {
      setContacts([...contacts, { id: Date.now(), name, phone }])
      setName('')
      setPhone('')
    }
  }

  const deleteContact = (id: number) => {
    setContacts(contacts.filter(c => c.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-700 p-4">
      <h1 className="text-4xl font-bold text-center text-white mb-8">Контактная книга</h1>
      <div className="max-w-md mx-auto bg-gray-200 p-6 rounded-lg shadow-md mb-8">
        <input
          className="w-full p-3 border rounded mb-3"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full p-3 border rounded mb-3"
          placeholder="Телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button
          onClick={addContact}
          className="w-full bg-purple-800 text-white p-3 rounded"> Добавить</button>
      </div>
      <ContactList contacts={contacts} onDelete={deleteContact} />
    </div>
  )
}