import { useState } from 'react'

function App() {
  const [contacts, setContacts] = useState([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const addContact = () => {
    if (name && phone) {
      setContacts([...contacts, { id: Date.now(), name, phone }])
      setName('')
      setPhone('')
    }
  }

  const deletephone = (id) => {
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
          className="w-full bg-purple-800 text-white p-3 rounded hover: border-l-purple-900">Добавить
        </button>
      </div>
      <div className="max-w-md mx-auto bg-gray-200 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Контакты ({contacts.length})</h2>
        {contacts.map((contact) => (
          <div key={contact.id} className="flex justify-between items-center p-3 border-b">
            <div>
              <div className="font-semibold">{contact.name}</div>
              <div className="text-gray-500">{contact.phone}</div>
            </div>
            <button
              onClick={() => deletephone(contact.id)}
              className="text-red-600 hover:text-red-900">Удалить</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App