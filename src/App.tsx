import { useUnit } from 'effector-react'
import {
  $contacts,
  $name,
  $phone,
  nameInputChanged,
  phoneInputChanged,
  contactAdded,
  contactDeleted,
  type Contact
} from './ContactEF'

type ContactCardProps = {
  contact: Contact
}

function ContactCard({ contact }: ContactCardProps) {
  const deleteContact = useUnit(contactDeleted)

  return (
    <div className="flex justify-between items-center p-3 border-b last:border-b-0">
      <div>
        <div className="font-semibold">{contact.name}</div>
        <div className="text-gray-500">{contact.phone}</div>
      </div>
      <button
        onClick={() => deleteContact(contact.id)}
        className="text-red-600 hover:text-red-900 transition-colors"
      >
        Удалить
      </button>
    </div>
  )
}

function ContactList() {
  const contacts = useUnit($contacts)

  return (
    <div className="max-w-md mx-auto bg-gray-200 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Контакты ({contacts.length})</h2>
      {contacts.length === 0 ? (
        <p className="text-gray-500 text-center py-4">Нет контактов</p>
      ) : (
        contacts.map(contact => (
          <ContactCard key={contact.id} contact={contact} />
        ))
      )}
    </div>
  )
}

function AddContactForm() {
  const [name, phone, addContact] = useUnit([$name, $phone, contactAdded])

  return (
    <div className="max-w-md mx-auto bg-gray-200 p-6 rounded-lg shadow-md mb-8">
      <input
        className="w-full p-3 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
        placeholder="Имя"
        value={name}
        onChange={(e) => nameInputChanged(e.target.value)} />
      <input
        className="w-full p-3 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
        placeholder="Телефон"
        value={phone}
        onChange={(e) => phoneInputChanged(e.target.value)}/>
      <button
        onClick={addContact}
        disabled={!name.trim() || !phone}
        className="w-full bg-purple-800 text-white p-3 rounded hover:bg-purple-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"> Добавить </button>
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-700 p-4">
      <h1 className="text-4xl font-bold text-center text-white mb-8">
        Контактная книга
      </h1>
      <AddContactForm />
      <ContactList />
    </div>
  )
}