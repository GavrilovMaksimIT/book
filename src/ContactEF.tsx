import { createStore, createEvent, sample } from 'effector'

export type Contact = {
  id: number
  name: string
  phone: string
}

export const $contacts = createStore<Contact[]>([])
export const $name = createStore('')
export const $phone = createStore('')

export const nameInputChanged = createEvent<string>()
export const phoneInputChanged = createEvent<string>()
export const contactAdded = createEvent()
export const contactDeleted = createEvent<number>()

export const nameChanged = createEvent<string>()
export const phoneChanged = createEvent<string>()

sample({
  clock: nameInputChanged,
  fn: (value) => value.replace(/[^a-zA-Zа-яА-ЯёЁ\s-]/g, ''),
  target: nameChanged
})

sample({
  clock: phoneInputChanged,
  fn: (value) => value.replace(/\D/g, ''),
  target: phoneChanged
})

$name.on(nameChanged, (_, name) => name)
$phone.on(phoneChanged, (_, phone) => phone)

sample({
  clock: contactAdded,
  source: { contacts: $contacts, name: $name, phone: $phone },
  filter: ({ name, phone }) => Boolean(name.trim() && phone),
  fn: ({ contacts, name, phone }) => [
    ...contacts,
    { id: Date.now(), name: name.trim(), phone }
  ],
  target: $contacts
})

sample({
  clock: contactAdded,
  target: [nameChanged.prepend(() => ''), phoneChanged.prepend(() => '')]
})

$contacts.on(contactDeleted, (contacts, id) => 
  contacts.filter(c => c.id !== id)
)